window.addEventListener("load", function() {
        

        getKebabId(29).then(json => {


                const KebabMod = structuredClone(json);
            
                const anadirK = editarKebab(KebabMod);
                
                const pideBtn = document.getElementById("pedir");

                if (pideBtn) {
                        
                        pideBtn.addEventListener("click", function () {
                                
                                if (anadirK.ingredientes.length > 0) {
                                // Realiza la acción si tiene ingredientes
                                        anadirCarrito(anadirK);
                                
                                        window.location.reload();
                                } else {
                                alert("Ingredientes no disponibles");
                                }

                                
                        })     
                }

                cerrarbtn= document.getElementsByClassName("closeKebab")[0]
                if(cerrarbtn){
                    cerrarbtn.style.display="none"
                }

        });
       


        

       

});









