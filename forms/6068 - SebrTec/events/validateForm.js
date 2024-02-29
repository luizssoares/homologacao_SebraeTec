function validateForm(form){
       //Geral
       var Now_State   = parseInt(getValue("WKNumState"));
       var completTask = getValue("WKCompletTask");
       var errorMsg    = "";
       var endofline   = "</br>";

       String.prototype.isEmpty = function(){ 
           return (!this || 0 === this.length); 
       };
       
       var txtFichaTec = form.getValue("txtFichaTec");
       var txtNomeCliente = form.getValue("txtNomeCliente");
       var txtCodSgtec = form.getValue("txtCodSgtec");
       var txt_Areas = form.getValue("txt_Areas");
       var ta_necessidade = form.getValue("ta_necessidade");
       var txt_Custo = form.getValue("txt_Custo");
       var txt_projeto = form.getValue("txt_projeto");
       var txt_acao = form.getValue("txt_acao");
       var txt_recursos = form.getValue("txt_recursos"); 
       var txt_saldo = form.getValue("txt_saldo");
       var check = form.getValue("radiotypes");   
       var Parcelas = form.getValue("txt_Parcelas");
       var Pagamento = form.getValue("txt_Pagamento"); 
       var ValorContrapartida = form.getValue("txt_Contrapartida");
       var Gerente = form.getValue("cmb_GerenteSolicitante");


       var fields = [txtFichaTec, txtNomeCliente, txtCodSgtec, txt_Areas, ta_necessidade, txt_projeto, txt_acao, txt_recursos,
        txt_saldo, txt_Custo, Gerente]

       var names = ["Nome da Ficha Técnica", "Nome do Cliente", "Código do SGTEC", "Área e Subárea da Contratação", "Necessidades",
         "Projeto", "Ação", "Unidade",  "Saldo", "Custo da Solução", "Gerente Aprovador"]
       
        if(Now_State == 0 || Now_State == 12 || Now_State == 51 &&(completTask == "true")){
            for(var i = 0; i < fields.length; i++){
                if(fields[i] == null || fields[i] == '' || fields[i] == "Selecione" || fields[i] == "0,00"){
                errorMsg += "Favor preencher campo <b>" + names[i] + "<\/b>" + endofline;
                }
            }

            enableValida()
            //validaContraPart()
            
            if (errorMsg.trim().isEmpty() == false) throw "\n"+errorMsg;
        }

        function validaContraPart(){
            valor   = desformata(txt_Custo)
            valor   = 30 / 100 * valor
            contra  = desformata(ValorContrapartida)
            if(contra < valor){
                errorMsg += "O <b>Valor da Contrapartida<\/b> deve ser no minimo 30% do <b>Custo da Solução<\/b>."+ endofline;
            }

        }
        function desformata(elem){
            elem = elem + '';
            elem = parseFloat(elem.replace(/[\D]+/g,''));
            elem = elem + '';
            elem = parseFloat(elem.replace(/([0-9]{2})$/g, ".$1"));
            return elem;
        }

        function enableValida(){
            if(check == ""){
                errorMsg += "É neccessário selecionar ao menos uma opção referente aos <b>Dados da Receita Prevista a Receber</b>"+ endofline;    
            }
            if(check == "sim"){ 
                if(Pagamento == "Especie"){
                    fields = [ValorContrapartida, Pagamento]
                    names = ["Valor da Contrapartida", "Pagamento"]
                    for(var i = 0; i < fields.length; i++){
                        if(fields[i] == null || fields[i] == '' || fields[i] == "Selecione" || fields[i] == "0,00"){
                        errorMsg += "Favor preencher campo <b>" + names[i] +"<\/b>"+ endofline;
                        }    
                    }
                }else{
                    fields = [ValorContrapartida, Pagamento, Parcelas]
                    names = ["Valor da Contrapartida", "Pagamento", "Parcelas"]
                    for(var i = 0; i < fields.length; i++){
                        if(fields[i] == null || fields[i] == '' || fields[i] == "Selecione" || fields[i] == "0,00"){
                        errorMsg += "Favor preencher campo <b>" + names[i] +"<\/b>"+ endofline;
                        }
                    }
                }
            }
        }

}