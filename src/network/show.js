import {request} from "./request";

export function getStore() {
  return request({
    url: '/store'
  })
}

export function getOrder() {
  return request({
    url: '/order'
  })
}

export function getPaths() {
  return request({
    url: '/path'
  })
}