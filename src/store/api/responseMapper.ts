import {Category} from './Category';
import { Refs } from "./user";

export namespace ResponseMapper {
  // export const login = (response: ITokenDataResponse): ITokenResponse => {
  //   const result = authRecoveryResponseHandler.handle(response);
  //
  //   return result as ITokenResponse;
  // };
  // export const checkToken = (response: CheckTokenResult): CheckTokenResult =>
  //   response;
  // export const refreshToken = (
  //   response: UpdateTokenResult,
  // ): UpdateTokenResult => response;
  // export const passwordRecovery = (
  //   response: IBaseAuthDataResponse,
  // ): IPasswordRecoveryResponse =>
  //   IPasswordRecoveryResponseHandler.handle(response);
  // export const setPassword = (
  //   response: IBaseAuthDataResponse,
  // ): ISetPasswordResponse => IPasswordRecoveryResponseHandler.handle(response);
  export const getCatalog = (response) => response;
  export const getPromoProducts = (response) => response;
  export const getProducts = (response) => response;
  export const getData = (response) => response;
  // export const getAccount = (response: IAccountResponse): IAccountState => {
  //   const {account, payMaster} = response.data.data;
  //
  //   const products: IProduct[] = account.products.filter(filterProductsByBrand);
  //
  //   const maxSearchDate: Moment =
  //     (products &&
  //       products.length &&
  //       products.reduce((acc, item) => {
  //         const newDate = moment(
  //           item.create_date,
  //           DateUtil.BACK_FULL_DATE_FORMAT,
  //         );
  //         if (newDate < acc) {
  //           return newDate;
  //         }
  //
  //         return acc;
  //       }, moment())) ||
  //     moment();
  //
  //   return {
  //     control: account.control,
  //     status: account.status,
  //     balance: account.balance,
  //     prev_expense: account.prev_expense,
  //     current_expense: account.current_expense,
  //     block_reason: account.block_reason,
  //     products,
  //     isFrozen: account.status === IAccountStatus.frozen,
  //     isCanceled: account.status === IAccountStatus.canceled,
  //     isInsufficientFunds:
  //       account.status === IAccountStatus.frozen &&
  //       account.block_reason === Strings.api.block_reason.insufficientFunds,
  //     payMaster: {
  //       merchant_id: payMaster.merchant_id,
  //     },
  //     maxSearchDate: maxSearchDate
  //       .startOf(dateUnit.month)
  //       .add(-1, dateUnit.day),
  //     promised_payment: {
  //       ...account.promised_payment,
  //       date: account.promised_payment.date
  //         ? moment(
  //             account.promised_payment.date,
  //             DateUtil.BACK_FULL_DATE_FORMAT,
  //           )
  //         : undefined,
  //     },
  //   };
  // };
  //   export const getWeekAccountCosts = (
  //     stateKey: 'weekAccountCosts' | 'monthAccountCosts',
  //   ) => (response: any): IAccountCostsData => {
  //     if (
  //       !response[stateKey] ||
  //       !response[stateKey].expensesReportResult ||
  //       !response[stateKey].expensesReportResult.data
  //     ) {
  //       return {
  //         costs: getCurrencyFormatted('0'),
  //       };
  //     }
  //
  //     const result: MathJsChain = response[stateKey].expensesReportResult.data
  //       .reduce(
  //         (acc: MathJsChain, cur) =>
  //           acc
  //             .add(math.bignumber(cur.services_expenses))
  //             .add(math.bignumber(cur.calls_expenses)),
  //         math.chain(0),
  //       )
  //       .done();
  //
  //     return {
  //       costs: getCurrencyFormatted(result.toString()),
  //     };
  // }
  // ;
}
