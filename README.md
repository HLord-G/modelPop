# modelPop
 
## Popup Model

_*Para Asa?:*_

*ge buhat ko ni na library para dali lang sa ako pag create ug Dialog:Model o Alert dali lang eh script ug pag edit sa tamplate ug design.*

---

<br>

# Model

---

*sample sa model *
```js
PopModel.model({
    "model-name":"other",

    template:()=>{
        return `
        <div class="datatest flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
            <h2 class="text-xl font-semibold leading-tight tracking-wide">Quis vel eros donec ac odio tempor.</h2>
            <p class="flex-1 dark:text-gray-600">Aenean sed adipiscing diam donec adipiscing tristique risus. Donec pretium vulputate sapien nec sagittis aliquam malesuada.
                <a href="#" rel="noopener noreferrer" class="font-semibold dark:text-emerald-600">Learn more</a>
            </p>
            <div class="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
                <button class="px-6 py-2 rounded-sm" popModelNo>Cancel</button>
                <button class="px-6 py-2 rounded-sm shadow-sm dark:bg-emerald-600 dark:text-gray-50">Agree</button>
            </div>
        </div>`
    },


    "modelLayout":{
        "backGroundOpaciy":6,
        "panelWidth":"unset",
        "panelHeight":"unset",
        "panelBackgroundColor":"#fff"        
    },



    yes:()=>{
        closeModel("other")
        PopModel.modelRunner("creator");
    },


    no:()=>{
        console.log("2")
    }
})
```

<br>

## Mga sample

*pag cerate sa model*
```js
PopModel.model({
    "model-name":"modelSample"
    })
```
<br>

*pag buhat sa template*
```js
    template:()=>{
        return ` `
    },
```
<br>

*pag apply sa timer sa pag popup sa Model once ma load ang browser.*
```js
    timerPopUp: 2000,  
```


*kung nai popup naa pud close, pag apply sa close timer sa Model *
```js
    timerRemove: 3000,  
```


*functions para pag open sa Dialog: Model*
```js
 PopModel.modelRunner("modelSample");
```


