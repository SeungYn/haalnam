type AnyObject = { [key: string]: any };

export function deepCopy<T>(obj: T): T {
  // 기본 데이터 타입 (null, undefined, 숫자, 문자열, 불리언) 또는 함수는 그대로 반환
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 배열일 경우
  if (Array.isArray(obj)) {
    const arrCopy = [] as any[];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepCopy(obj[i]);
    }
    return arrCopy as T;
  }

  // 객체일 경우
  const objCopy = {} as AnyObject;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepCopy((obj as AnyObject)[key]);
    }
  }
  return objCopy as T;
}
