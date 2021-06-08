import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'd3-tip/d3tip.css'
import 'vant/lib/index.css'
import {
  ElButton, ElSelect, ElDropdown, ElDropdownItem, ElDropdownMenu,
  ElIcon, ElOption, ElForm, ElFormItem, ElTag, ElInputNumber, ElInput,
  ElMenu, ElMenuItem, ElSubmenu, ElRow, ElCol, ElTable, ElTableColumn
} from 'element-plus';
import {
  Switch, Cell, CellGroup, Button,
  List, Form, Field, Col, Row,
  DropdownMenu, DropdownItem, Picker,
} from 'vant';


createApp(App).use(store).use(router)
    .use(Switch).use(Cell).use(CellGroup).use(Button)
    .use(List).use(Form).use(Field).use(Col).use(Row)
    .use(DropdownMenu).use(DropdownItem).use(Picker)
    .use(ElButton).use(ElSelect).use(ElDropdown).use(ElDropdownItem).use(ElDropdownMenu)
    .use(ElIcon).use(ElOption).use(ElForm).use(ElFormItem).use(ElTag).use(ElInputNumber)
    .use(ElInput).use(ElMenu).use(ElMenuItem).use(ElSubmenu).use(ElRow).use(ElCol)
    .use(ElTable).use(ElTableColumn)
    .mount('#app');
