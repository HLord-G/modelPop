class PopModel {

    static model(system){
        let htmlString = system.template()
        let replacedHtmlString = htmlString.replace(/(popModelYes|popModelNo|closethismodel)(?=\s|>)/g, `$1="${system["model-name"]}"`);


        function overflowhiddenBody(propt){
            if(!propt){
                document.querySelector("body").style = `overflow:unset;`
            }else{
                document.querySelector("body").style = `overflow:hidden;`
            }
        }


        const style = document.createElement('style');
        style.textContent = `
            * {
                padding:0;
                margin: 0;
                box-sizing: border-box;
            }
        `;
        document.head.appendChild(style);

        if (system["timerPopUp"]) {
            setTimeout(() => {
                PopModel.modelRunner(system["model-name"]);
                timerRemove();
            }, system["timerPopUp"]);
        }

        function timerRemove(){
            if (system["timerRemove"]) {
                setTimeout(() => {
                    document.querySelector(`#${system["model-name"]}`).remove();
                }, system["timerRemove"]);
            }
        }

        function mainTemplate(x){
            let panelWidth, panelHeight, panelBackgroundColor, backGroundOpaciy;

            if (!system["modelLayout"]) {
                panelWidth = "unset";
                panelHeight = "unset";
                panelBackgroundColor = "transparent";
                backGroundOpaciy = 7;
            } else {
                panelWidth = system["modelLayout"]["panelWidth"];
                panelHeight = system["modelLayout"]["panelHeight"];
                panelBackgroundColor = system["modelLayout"]["panelBackgroundColor"];
                backGroundOpaciy = system["modelLayout"]["backGroundOpaciy"];
            }

            const popUpBody = document.createElement("div");
            popUpBody.id = "popupbody";
            popUpBody.style.cssText = `
                width: ${panelWidth};
                height: ${panelHeight};
                background-color: ${panelBackgroundColor};
                overflow: auto;
                margin-top: 20px;
            `;
            popUpBody.innerHTML = x;

            const div_container = document.createElement('div');
            div_container.id = system["model-name"];
            div_container.style.cssText = `
                width: 100%;
                height: 100vh;
                overflow: auto;
                position: absolute;
                top: 0; left: 0;
                z-index: 999;
                background-color: rgba(0, 0, 0, 0.${backGroundOpaciy});
                padding: 20px;
            `;

            const containerFolder = document.createElement('div');
            containerFolder.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: auto;
                padding: 20px;
            `;

            div_container.appendChild(containerFolder);
            containerFolder.appendChild(popUpBody);

            document.querySelector('body').appendChild(div_container);
        }

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('modelPop') && event.target.getAttribute('modelPop') === system["model-name"]) {
                overflowhiddenBody(true)
                mainTemplate(replacedHtmlString);
            }
        });

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('popModelYes') && event.target.getAttribute('popModelYes') === system["model-name"]) {
                system.yes();
            }
        });

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('popModelNo') && event.target.getAttribute('popModelNo') === system["model-name"]) {
                system.no();
                overflowhiddenBody(false)
                document.querySelector(`#${system["model-name"]}`).remove();
            }
        });

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('closethismodel') && event.target.getAttribute('closethismodel') === system["model-name"]) {
                document.querySelector(`#${system["model-name"]}`).remove();
                overflowhiddenBody(false)
            }
        });

        
    }




    static modelRunner(x) {
        return new Promise((resolve, reject) => {
            let tempBtn = document.createElement("button");
            tempBtn.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                visibility: hidden;
            `;
            tempBtn.id = `tempbtnrunner${x}`;
            tempBtn.setAttribute('modelPop', `${x}`);

            document.body.appendChild(tempBtn);

            setTimeout(() => {
                tempBtn.click();
                resolve();
            }, 10);

            setTimeout(() => {
                tempBtn.remove();
            }, 100);
        });
    }




    static alertRunner(x){
        return new Promise((resolve, reject) => {
            let tempBtn = document.createElement("button");
            tempBtn.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                visibility: hidden;
            `;
            tempBtn.id = `tempbtnrunner${x}`;
            tempBtn.setAttribute('alertPop', `${x}`);

            document.body.appendChild(tempBtn);

            setTimeout(() => {
                tempBtn.click();
                resolve();
            }, 10);

            setTimeout(() => {
                tempBtn.remove();
            }, 100);
        });
    }










    static alertModel(system){

        let htmlString = system.template()
        let replacedHtmlString = htmlString.replace(/(popModelYes|popModelNo|closethismodel)(?=\s|>)/g, `$1="${system["model-name"]}"`);

        


        let positionStyle = {
            TopLeft:`
            position: fixed;
            z-index:9;
            top: 2%;
            left: 1%;`,
            TopRight:`
            position: fixed;
            z-index:9;
            top: 2%;
            right: 1%;`,
            BottomLeft:`
            position: fixed;
            z-index:9;
            bottom: 2%;
            left: 1%;`,
            BottomRight:`
            position: fixed;
            z-index:9;
            bottom: 2%;
            right: 1%;`,
            CenterCenter:`
            position: fixed;
            z-index:9;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);`
        };


        

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('alertPop') && event.target.getAttribute('alertPop') === system["model-name"]) {
                let limitOutput = document.querySelectorAll(`.${system["model-name"]}outputlimits`).length

                let idKungNaa = document.querySelector(`#${system["positionStyle"]}`);
                let divCount = document.querySelectorAll(`#${system["positionStyle"]} div`).length;
                let bodyClickClose = "";
                if (system["bodyClickClose"]) {   
                    bodyClickClose = "bodyClickClose";
                }

                let poplimitOutput = ""
                if (system["poplimits"]) {
                    poplimitOutput = `${system["model-name"]}outputlimits`
                }

                if (idKungNaa == null) {
                    let tempAlertDiv = document.createElement("div");
                    switch (system["positionStyle"]) {
                        case "top-left":
                            tempAlertDiv.style.cssText = positionStyle["TopLeft"];
                            break;
                        case "top-right":
                            tempAlertDiv.style.cssText = positionStyle["TopRight"];
                            break;
                        case "bottom-left":
                            tempAlertDiv.style.cssText = positionStyle["BottomLeft"];
                            break;
                        case "bottom-right":
                            tempAlertDiv.style.cssText = positionStyle["BottomRight"];
                            break;
                        case "center-center":
                            tempAlertDiv.style.cssText = positionStyle["CenterCenter"];
                            break;
                    }
                    tempAlertDiv.id = system["positionStyle"];

                    tempAlertDiv.innerHTML = `<span class="${bodyClickClose} ${poplimitOutput}" id="al${system["model-name"]}${divCount}">${replacedHtmlString}</span>`;
                    document.querySelector('body').appendChild(tempAlertDiv); 

                    if (system["timerClose"]) {
                        setTimeout(() => {
                            try {
                                document.querySelector(`#al${system["model-name"]}${divCount}`).remove();
                            } catch (error) {
                                // console.log("remove err a")
                            }
                        }, system["timerClose"]);
                    }

                } else {

                    if (system["poplimits"]-1 >= limitOutput) {
                        idKungNaa.innerHTML += `<span class="${bodyClickClose} ${poplimitOutput}" id="al${system["model-name"]}${divCount}">${replacedHtmlString}</span>`;

                        if (system["timerClose"]) {
                            setTimeout(() => {
                                try {
                                    document.querySelector(`#al${system["model-name"]}${divCount}`).remove();
                                } catch (error) {
                                    // console.log("remove err b")
                                }
                            }, system["timerClose"]);
                        }
                    }else{

                        if (!system["poplimits"]) {
                            idKungNaa.innerHTML += `<span class="${bodyClickClose} ${poplimitOutput}" id="al${system["model-name"]}${divCount}">${replacedHtmlString}</span>`;

                            if (system["timerClose"]) {
                                setTimeout(() => {
                                    document.querySelector(`#al${system["model-name"]}${divCount}`).remove();
                                }, system["timerClose"]);
                            }
                        }

                    }
   
                }

                // Add event listener right after creating the elements
                let bodyClickCloseTrigger = document.querySelectorAll(".bodyClickClose");
                if (bodyClickCloseTrigger.length > 0) {
                    bodyClickCloseTrigger.forEach(element => {
                        element.addEventListener("click", function(){
                            element.remove()
                        });
                    });
                }
            }
        });




        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('popModelYes') && event.target.getAttribute('popModelYes') === system["model-name"]) {
                system.yes();
            }
        });

 

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('closethismodel') && event.target.getAttribute('closethismodel') === system["model-name"]) {
                let parentDiv = event.target.closest('span'); // Replace with the specific class or ID of the parent div
                if (parentDiv) {
                    let elementId = parentDiv.id; // Get the ID of the parent div
                    document.querySelector(`#${elementId}`).remove()
                } 
            }
        });

        document.addEventListener('click', function(event) {
            if (event.target.hasAttribute('popModelNo') && event.target.getAttribute('popModelNo') === system["model-name"]) {
                // Traverse up the DOM tree to find the closest parent div with a specific class or ID
                let parentDiv = event.target.closest('span'); // Replace with the specific class or ID of the parent div
                if (parentDiv) {
                    let elementId = parentDiv.id; // Get the ID of the parent div
                    document.querySelector(`#${elementId}`).remove()
                } 
                
                system.no(); // Pass the ID to the system.no function

            }
        });
        

    }
}


function closeModel(x) {
    document.querySelector(`#${x}`).remove()
}



