import {put} from "redux-saga/effects";

export function GetHeaders() {
  let headers = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if (localStorage.token) {
    headers.headers["Authorization"] = `Bearer ${localStorage.token}`;
  }
  return headers
}

export function* ErrorCheck(action, error, errorConst) {
  console.log("action=>",action)
  console.log("error=>",error)
  console.log("errorConst=>",errorConst)
  if (!error.response && error.message) {
    yield put({type: errorConst, error: error.message, addOns: action});
  } else if (error.response.status === 400) {
    yield put({type: errorConst, error: formatErrors(error.response.data), addOns: action});
  }else if( error.response.status === 403){
    yield put({type: errorConst, error: error.response.data.detail, addOns: action});
  }else if (error.response.status === 500) {
    yield put({type: errorConst, error: "Something Went Wrong, Please Try again later", addOns: action});
  }
  else if (error.response.status === 401) {
    localStorage.clear();
    yield put({type: errorConst, error: error.response.data.detail, addOns: action});
  }
}

function formatErrors(errorObject) {
  let errorMessages = [];

  for (const key in errorObject) {
    if (errorObject.hasOwnProperty(key)) {
      errorMessages.push(`${key}: ${errorObject[key].join(', ')}`);
    }
  }

  return errorMessages.join('\n');
}

export function compare(newProps, oldProps) {
  return newProps && newProps !== oldProps;
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export function getCommaSepratedValuesFromObject(inputObject) {
  return Object.keys(inputObject).map(function (k) {
    return inputObject[k]
  }).join(",")
}

export function getCommaSepratedValuesFromArray(inputArray) {
  let values = '';
   inputArray.forEach(inputObject => values + getCommaSepratedValuesFromObject(inputObject))
  return values;
}
export const GoogleMapsAPIKey = 'AIzaSyDSiHSy5W40gQJqhQhpYS0MuPHpWwg_GMw';
