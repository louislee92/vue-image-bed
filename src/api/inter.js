import service from './service'

export default {
  // 批量上传
  batchUpload(data) { return service.upload("/image/upload", data);},
  // 读取
  read(data) { return service.get("/image", data)},
  // 删除
  del(data) { return service.del("/image", data) },
}
