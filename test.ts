import Axios, { AxiosResponse } from "axios"
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

(async () => {
	try {
		let observable$ = Observable.create( ( observer ) => {
			Axios.get( 'https://jsonplaceholder.typicode.com/users' )
			.then( ( response ) => {
				observer.next( response.data );
				observer.complete();
			} )
			.catch( ( error ) => {
				observer.error( error );
			} );
		} )

		const aaa = observable$.pipe(
			map((x: any) => {
				const res = x as any
				const customNameList = res.map((item)=>{return {
					"customName" : item.name + "#"
				}})
				return customNameList
			}),

		)

		const result = await aaa.toPromise()
		console.log(result)

	} catch (e) {
		console.log(e)
	}
})()


