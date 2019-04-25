$(document).ready(function () {

  $("#DivRow").hide();

  $('[data-toggle="tooltip"]').tooltip();


  // ****** CAMBIAR IMAGEN DEBALAZO POR PLATILLO/BEBIDA ******
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      var titulo = $('#Titulo').val();

      reader.onload = function (e) {
        alert(e.target.text);
        alert(e.target.result);
        $('#profile-img-tag').attr('src', e.target.result);
        $('#profile-img-tag').attr('alt', titulo);
      }
      reader.readAsDataURL(input.files[0]);
    }
  };

  $('#profile-img').change(function () {
    readURL(this);
  });
  // ****** CAMBIAR IMAGEN DEBALAZO POR PLATILLO/BEBIDA ******



  // ****** FORMATO MONEDA INPUT ******
  $("input[data-type='currency']").on({
    keyup: function () {
      formatCurrency($(this));
    },
    blur: function () {
      formatCurrency($(this), "blur");
    }
  });

  function formatNumber(n) { // aplica formato separador de miles 1000 => 1,000
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  function formatCurrency(input, blur) { // agregar signo $, validar decimales, cursor a la derecha

    var input_val = input.val();
    if (input_val === "") {
      return;
    }

    var original_len = input_val.length;
    var caret_pos = input.prop("selectionStart");
    if (input_val.indexOf(".") >= 0) {

      var decimal_pos = input_val.indexOf(".");
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);

      left_side = formatNumber(left_side);
      right_side = formatNumber(right_side);

      if (blur === "blur") {
        right_side += "00";
      }

      right_side = right_side.substring(0, 2);

      input_val = "$" + left_side + "." + right_side;

    } else {
      input_val = formatNumber(input_val);
      input_val = "$" + input_val;

      if (blur === "blur") {
        input_val += ".00";
      }
    }

    input.val(input_val);
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
  } // ----> FIN  formatCurrency
  // ****** FORMATO MONEDA INPUT ******

}); // ----> FIN  document.ready


// ****** MOSTRAR/OCULTAR -DIV- PORCIONES DIFERENTES ******
function EnableDiv() {
  if ($("#DifPorc").prop("checked")) {
    $("#DivRow").slideDown("slow");
    $("#Precio").prop({
      disabled: true
    }).val("");
  } else {
    $("#DivRow").hide("slow");
    $(".chkDifPorc").prop({
      checked: false
    });
    $(".txtDifPorc").prop({
      disabled: true
    }).val("");
    $("#Precio").prop({
      disabled: false
    }).val("");
  }
};
// ****** MOSTRAR/OCULTAR -DIV- PORCIONES DIFERENTES ******


// ****** DES/HABILITAR txt's PRECIO PORCIONES ******
function EnableDisableChico(chkCh) {
  var txtCh = document.getElementById("txtCh");
  txtCh.disabled = chkCh.checked ? false : true;
  if (!txtCh.disabled) {
    txtCh.focus();
  }
};

function EnableDisableMediano(chkMed) {
  var txtMed = document.getElementById("txtMed");
  txtMed.disabled = chkMed.checked ? false : true;
  if (!txtMed.disabled) {
    txtMed.focus();
  }
};

function EnableDisableGrande(chkGde) {
  var txtGde = document.getElementById("txtGde");
  txtGde.disabled = chkGde.checked ? false : true;
  if (!txtGde.disabled) {
    txtGde.focus();
  }
};
// ****** DES/HABILITAR txt's PRECIO PORCIONES ******