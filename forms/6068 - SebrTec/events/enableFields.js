function enableFields(form){ 
    var Now_State = parseInt(getValue("WKNumState"));

    if(Now_State == 0 || Now_State == 12 || Now_State == 51){
        fields = ["cmb_NomeSolicita", "dt_dataSolicita", "cmb_UnidadeSolicitante",
		"txt_NumProc"]
        disableFieldsFromList(form, fields);
	}
	if(Now_State == 13 || Now_State == 15 || Now_State == 44 || Now_State == 17 || Now_State == 47 || 
		Now_State == 34 || Now_State == 38){
		disableAllFields(form)
	}
	/*if(Now_State == 12){
		disableAllFields(form)
		fields = ["slc_PagamentoPara", "slc_Natureza"]
        enableFieldsFromList(form, fields);
	}
	if(Now_State == 19 || Now_State == 21){
		disableAllFields(form)
		fields = ["txt_dtPag", "ckb_provisao", "txt_dtProv"]
        enableFieldsFromList(form, fields);
	}
	if(Now_State == 32){
		disableAllFields(form)
		fields = ["txt_dtBaixa"]
        enableFieldsFromList(form, fields);
	}*/
}

function disableAllFields(form) {
	var fields =    form.getCardData();
	var iterare =   fields.keySet().iterator();
	while (iterare.hasNext()) {
		var key =   iterare.next();
		form.setEnabled(key, false, false);
	}
}

function enableFieldsFromList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}

function disableFieldsFromList(form,fields){
	for(var i = 0; i<fields.length; i++){
		form.setEnabled(fields[i], false);
	}
}