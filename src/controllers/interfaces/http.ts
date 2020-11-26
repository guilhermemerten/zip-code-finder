export type HttpResponse = {
  statusCode: number,
  body: any,
  file?: any
}

export type HttpRequest = {
  body?: any,
  headers?: any,
  params?: any,
  query?: any
}