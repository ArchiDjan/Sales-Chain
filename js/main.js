$( document ).ready(function() {

  $( window ).on( "orientationchange", function( event ) {
    if(event.orientation = "landscape")
    {
      $(".ch_orient").toggleClass( "col-sm-6" );
    }
  });

  $(".mobile_menu_btn").on("click", function(e) {
    $(".mobile_menu").show();
    $(".mobile_menu_btn").hide();
  });

  $(".close_menu").on("click", function() {
    $(".mobile_menu").hide();
    $(".mobile_menu_btn").show();
  });

  $( "#fist_step_reg" ).submit(function( event ) {
    if ( $("#passwperson").val() != $("#confirmPasswPerson").val() )
    {
      $(".fieldError").addClass("fieldError_active");
      event.preventDefault();
      return;
    }
    else
    {
      $(".fieldError").removeClass("fieldError_active");
    }

    $("#fist_step_reg").hide();
    $("#sendSecondStepReg").attr("disabled", false);
    event.preventDefault();
  });

  // проверка текстовых полей на заполнение
  // function hasValue(eTarget) {
  //   content = eTarget.value;
  //   textPlaceHol = $(eTarget).attr("placeholder");
  //   if (!content)
  //   {
  //     $(eTarget).addClass("error_input");
  //     $(eTarget).attr("placeholder", ("Заполните поле: " + textPlaceHol));
  //   }
  //   else
  //   {
  //     $(eTarget).removeClass("error_input");
  //   }
  // }
  //
  // // проверка поля email
  // function checkMail(eTarget) {
  //   regMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  //   // regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //
  //   content = eTarget.value;
  //   textPlaceHol = $(eTarget).attr("placeholder");
  //   if (!content)
  //   {
  //     $(eTarget).addClass("error_input");
  //     $(eTarget).attr("placeholder", ("Заполните поле: " + textPlaceHol));
  //   }
  //   else if (regMail.test(content))
  //   {
  //     $(eTarget).addClass("error_input");
  //     $(eTarget).attr("placeholder", ("Введен неорректный email"));
  //   }
  //   else
  //   {
  //     $(eTarget).removeClass("error_input");
  //   }
  // }
  //
  //
  // function checkInput(e) {
  //   var target = e.target || e.srcElement;
  //   if (target.type == "text")
  //   {
  //     hasValue(target);
  //   }
  //   else if (target.type == "email")
  //   {
  //     checkMail(target);
  //   }
  //   else if (target.type == "number")
  //   {
  //     // alert("поле number");
  //   }
  //   else if (target.type == "password")
  //   {
  //     // alert("поле password");
  //   }
  // }
  //
  // $(".chng_fc_onestep").focusout(function(e) {
  //   checkInput(e);
  // });
  //
  // $(".chng_fc_onestep").change(function(this) {
  //   checkInput(this);
  //   //$("#sendOneFormReg").attr("disabled", false);
  // })



});
