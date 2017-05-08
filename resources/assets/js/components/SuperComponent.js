/**
 * Created by Albert Lin on 2017/5/2.
 */

export function SuperComponent(){
	let vue = {};
	this.__proto__.components = {};
	this.__proto__.props = [];
	this.__proto__.data = () => { return{}; };
	this.__proto__.computed = {};
	this.__proto__.watch = {};
	this.__proto__.methods = {};
	this.__proto__.mounted = {};
}