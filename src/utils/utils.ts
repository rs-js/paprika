import {Address} from "../store";

interface ITemplate {
  [key: string]: (v: string | number) => string;
}

export const addressTemplate: ITemplate = {
  city: val => `г. ${val}`,
  street: val => `ул. ${val}`,
  house: val => `д. ${val}`,
  building: val => `ст. ${val}`,
  corpus: val => `корп. ${val}`,
  porch: val => `подъезд ${val}`,
  intercomCode: val => `код ${val}`,
  floor: val => `этаж ${val}`,
  apartment: val => `кв. ${val}`,
  comment: val => `Комментарий: ${val}`,
};

export const composeStorageAddress = (addr: Address) => {
  return ['city', 'street', 'house', 'building', 'corpus']
    .map(key => addr[key] && addressTemplate[key](addr[key]))
    .filter(Boolean)
    .join(', ');
};

export enum FirebaseErrors {
  'auth/invalid-credential' = 'Пользователь не найден. Зарегистрируйтесь',
  'auth/too-many-requests' = 'Превышено количество попыток входа. Побробуйте позднее',
  'auth/invalid-verification-code' = 'Неправильный код. Введите снова',
  'auth/app-not-authorized' = 'Неавторизованное использование приложения',
  'auth/invalid-user-token' = 'Неправильные входные данные. Побобуйте снова',
  'auth/account-exists-with-different-credential' = 'Пожалуйста войдите с помощью Google или Apple',
  error = 'Произошла ошибка. Повторите еще раз.',
}

const Debug = {
  IS_TEST_BUILD: true,
  DISABLE_LOGGING: false,
  LOG_NETWORK: false,
};

export namespace Log {
  export const message = (...args: any[]) => {
    if (!Debug.DISABLE_LOGGING) {
      console.warn(...args);
    }
  };

  export const info = (...args: any[]) => {
    if (!Debug.DISABLE_LOGGING) {
      // console.log(...args);
    }
  };
}
