import { ajax } from "rxjs/ajax";
//@ts-ignore
import { Subject, of } from "rxjs";
import { map, switchMap, share, take, catchError } from "rxjs/operators";
//@ts-ignore
import _merge from "loadsh/merge";

const http$ = new Subject();
const http$$ = http$.pipe(
  switchMap((config: any) =>
    ajax({
      ...config,
    }).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((error: Error) => {
        return of({
          response: new Error("接口异常"),
        });
      })
    )
  ),
  share()
);

http$$.subscribe();
export const postChemicalReact = (parmas: any) => {
  const mergeConfig = _merge(
    {
      url: "https://test-chemical-web.xxx.com/chemical/react",
      method: "POST",
    },
    {
      body: parmas,
    }
  );
  http$.next(mergeConfig);
  return http$$.pipe(take(1));
};

export const getChemicals = () => {
  const mergeConfig = _merge(
    {
      url: "https://test-chemical-web.xxx.com/chemical/getAll",
      method: "get",
    },

  );
  http$.next(mergeConfig);
  return http$$.pipe(take(1));
};
