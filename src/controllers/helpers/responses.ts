import { HttpResponse } from "../interfaces/http"

export const makeBadRequestResponse = (body:string | object):HttpResponse =>{
    return {
        statusCode: 400,
        body
      }
}

export const makeNotFoundResponse = (body:string | object):HttpResponse =>{
    return {
        statusCode: 404,
        body
      }
}

export const makeSucessResponse = (body:string | object):HttpResponse =>{
    return {
        statusCode: 200,
        body
      }
}

export const makeInternalServerErrorResponse = (body:string | object):HttpResponse =>{
    return {
        statusCode: 500,
        body
      }
}

