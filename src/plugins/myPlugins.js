const myplugins = {}

myplugins.install = function(Vue,options){
    Vue.directive(options.name,(element,params)=>{
        console.log(params);
        element.innerHTML = params.value.toUpperCase()
    })
}
export default myplugins