<template>
  <div>
    <div id="vis" name="path" style="margin-top: -2em" @click="hideTip">
      <svg width="1200" height="600" id="mainsvg" class="svgs" style="display: block;margin: auto"/>
    </div>
  </div>
</template>

<script>
  import {getStore, getOrder, getPaths} from "../../../network/show";
  import {onMounted, reactive, toRefs, ref, watchEffect, watch} from 'vue';
  import {useStore} from 'vuex';
  import * as d3 from 'd3';
  import d3tip from 'd3-tip';


  export default {
    name: "Path",
    props: {},
    setup() {
      const store = useStore();
      const state = reactive({
        store: [],
        order: [],
        paths: {
          path1: [],
          path2: [],
          path3: [],
        }
      });
      let margin = ({top: 10, right: 30, bottom: 30, left: 40}),
          width = window.innerWidth - margin.left - margin.right,
          height = window.innerHeight * 0.9 - margin.top - margin.bottom;
      const color = d3.scaleOrdinal()
          .domain(["path1", "path2", "path3", "start", "end"])
          .range(["blue", "red", "orange", "lightgreen", "yellow"]);
      const tip = d3tip()
          .attr("class", "d3-tip")
          .html(data => {
            return `
        <h6>执行行车：${data.crane}</h6>
        <h6>钢卷号：${data.coilNo}</h6>
        <h6>订单号：${data.orderNo}</h6>
        <h6>类型：${data.type === 0 ? "倒剁" : data.type === 1 ? "出入库" : "倒机组"}</h6>
        `
          });
      let svg;
      let g;
      let xScale = d3.scaleLinear()
          .domain([0, 320])
          .range([margin.left, width - margin.right]);
      let yScale = d3.scaleLinear()
          .domain([0, 42])
          .range([height - margin.bottom, margin.top]);


      const xValue = d => d.CurX / 1000;
      const yValue = d => d.CurY / 1000;
      const line = d3.line()
          .x(d => xScale(xValue(d)))
          .y(d => yScale(yValue(d)))
          .curve(d3.curveCatmullRom);
      const addPoint = (flag, enter) => {
        enter.append("g")
            .attr("name", flag)
            .append("circle")
            .attr("cx", data => xScale(+(flag === "start" ? data.start[0] : data.end[0]) / 1000))
            .attr("cy", data => yScale(+(flag === "start" ? data.start[1] : data.end[1]) / 1000))
            .attr("r", 6)
            .style("fill", color(flag))
            .text("1")
            .style("font-color", "#000000")
            .attr('stroke-width', 1)
            .attr("opacity", 0.7)
            .attr("class", data => "pc" + data.flag)
            .on("mouseover", function () {
              d3.select(this)
                  .attr('opacity', 0.5)
                  .attr("stroke", color(flag))
                  .attr('stroke-width', 4)
            })
            .on("mouseout", function () {
              d3.select(this)
                  .attr('opacity', 0.8)
                  .attr('stroke', color(flag))
                  .attr('stroke-width', 1);
              setTimeout(() => {
                tip.hide()
              }, 2000)
            })
            .on("click", function (d1, d2) {
              tip.show(d2, this)
            });
      };

      const addText = (flag, enter, pointNo) => {
        enter.append("text")
            .attr("class", data => "tt pc" + data.flag)
            .attr("x", data => xScale(+(flag === "start" ? data.start[0] : data.end[0]) / 1000))
            .attr("y", data => yScale(+(flag === "start" ? data.start[1] : data.end[1]) / 1000))
            .attr("text-anchor", "middle")
            .attr("dy", 4)
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(data => pointNo[+(data.flag) - 1]++)
      };

      const render_init = () => {
        svg = d3.select('#mainsvg')
            .attr('width', width + margin.left + margin.top)
            .attr('height', height + margin.top + margin.bottom);

        let tempG = svg.select("#maingroup");
        tempG.remove();

        g = svg.append("g")
            .attr("id", "maingroup")
            .attr('transform', `translate(${margin.left},${margin.top})`);

        let xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        let yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        // 绘制坐标轴
        g.append("g").call(xAxis);
        g.append("g").call(yAxis);

        // 绘制库位块
        g.selectAll('rect').data(state.store).enter()
            .append('g')
            .append('rect')
            .attr('x', function (d) {
              // console.log(data);
              return xScale(d.x)
            })
            .attr('y', function (d) {
              return yScale(d.y)
            })
            .attr("width", function (d) {
              return xScale(d.width) - margin.left
            })
            .attr("height", function (d) {
              return height - margin.bottom - yScale(d.height)
            })
            .style("fill", "#888");
        //文字
        g.selectAll('g')
            .enter()
            .append('text').data(state.store).enter().append('text')
            .attr('x', function (d) {
              return xScale(d.x);
            })
            .attr('y', function (d) {
              return yScale(d.y) - 5;
            })
            .text(function (d) {
              return d.name;
            })
            .attr('fill', 'black');
        svg.call(tip);
        g.append("g").attr("id", "path1");
        g.append("g").attr("id", "path2");
        g.append("g").attr("id", "path3");
      };

      const render_order = () => {
        let pointEnter = g.selectAll("circle").data(state.order).enter();
        addPoint("start", pointEnter);
        addPoint("end", pointEnter);

        let textEnter = g.selectAll(".tt").data(state.order).enter();
        let startNo = [1, 1, 1], endNo = [1, 1, 1];
        addText("start", textEnter, startNo);
        addText("end", textEnter, endNo);
      };

      const render_update = (routes, flag, id) => {
        let circleUpdate = g.select(`#${flag}`).selectAll(`#${flag}id${id}`).data([routes]);
        let circleEnter = circleUpdate.enter()
            .append('path')
            .attr("id", `${flag}id${id}`)
            .attr("class", flag)
            .attr("d", line)
            .attr("stroke", color(flag))
            .attr("stroke-width", 2)
            .attr("fill", "none");

        circleUpdate.merge(circleEnter)
            .transition().ease(d3.easeLinear).duration(1000)
            .attr("d", line);

        if (id >= 50) {
          let disappear = g.select(`#${flag}`).selectAll(`#${flag}id${id - 50}`);
          disappear.transition().ease(d3.easeLinear).duration(10).attr("stroke-opacity", .2);
        }
      };
      const loadAndRender = (flag) => {
        let data = state.paths[flag];
        let routes = [];
        let c = 0;
        let intervalID = setInterval(() => {
          if (c >= data.length) {
            clearInterval(intervalID);
            g.selectAll("path").attr("stroke-opacity", 1)
          } else {
            if (c !== 0 && c % 10 === 0) {
              routes = [data[c - 1]];
            }
            routes.push(data[c]);
            render_update(routes, flag, Math.floor(c / 10));
            ++c;
          }
        }, 10)
      };

      onMounted(() => {
        getStore().then(res => {
          state.store = res.data;
          render_init();
          getOrder().then(res => {
            state.order = res.data;
            store.commit('setOrderInfo', res.data);
            render_order();
            getPaths().then(res => {
              // console.log(res);
              let keys = ["path1", "path2", "path3"];
              state.paths = res;
              store.commit('setPathInfo', res);
              for (let key of keys) {
                loadAndRender(key);
              }
            })
          })
        });
      });

      function hideTip(e) {
        // console.log(e);
        if (e.path.length < 10) {
          tip.hide();
        }
      }

      const reload = (flag) => {
        document.getElementById("path" + flag).innerHTML = "";
        loadAndRender("path" + flag);
      };

      const reloadAll = () => {
        reload(1);
        reload(2);
        reload(3);
      };

      return {
        ...toRefs(state),
        hideTip,
        reload,
        reloadAll,
      }
    }
  }
</script>

<style>
  .tt {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
  }
</style>