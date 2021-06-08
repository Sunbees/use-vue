import {request} from "./request";

export function getStockNo() {
  return request({
    url: '/stockNo'
  })
}

export function query(data) {
  return request({
    url: '/query',
    method: 'post',
    data,
  })
}

export function getCraneInfo() {
  return request({
    url: '/craneInfo'
  })
}

export function updateCraneInfo(data) {
  return request({
    url: '/craneInfo',
    method: 'post',
    data
  })
}
