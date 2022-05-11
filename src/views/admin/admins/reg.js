
$(document).ready(function() {

    $("#register").click(function() {


/****************************************************************************************** */

    var myArray = {
        nat_num: fixNumbers(nat_num),
        first_name: first_name,
        last_name: last_name,
        father_name: father_name,
        mother_name: mother_name,
        mobile_num: fixNumbers(mobile_num),
        applied_kind: applied_kind,
        center:center,
        nat_num_ext: fixNumbers(nat_num_ext),
        captcha : captcha,
        cop_num : cop_num
        };

     
            var myArray1 ={
                applied_kind : applied_kind,
                center :center,
				captcha : captcha,
				nat_num:nat_num,
            };
            $.ajax({
                        type:"POST",
                        data:myArray1,
                        url:"API/getava_dates.php",
                        success:function(data)
                        {
							$("body").css("cursor","default");
                             $("#register").prop("disabled",false);
                            if(data.trim() == "Friday")
                            {
                                
                            }
                            else if(data.trim() == "End")
                            {
                                
                            }
							else if(data.trim() == "reload")
                            {
								
                            }
							else if(data.trim() == "captchaerr")
							{
								
							}
                            var av_date = JSON.parse(data);
							var disableDates = [];
                            for(var i in av_date){
                                disableDates.push(av_date[i]);
                            }
                            show(disableDates);
                            var span = document.getElementById("datepicker");
                            span.style.display="";

                            Swal.fire({
                                title: "اختيار موعد الحجز",
                                html:span,
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#2dce89",
                                confirmButtonText: "تثبيت الموعد",
                                cancelButtonText: "الغاء",
                                closeOnConfirm: false
                            }).then((result) => {
                          
                            if(result.isConfirmed)
                                {
                                    var appoinment_date = document.getElementById("datepicker").value;
                                    if(appoinment_date == "")
									{
										Swal.fire({
											title:"تحذير",
											icon:"error",
											text:"يرجى اختيار موعد الحجز"
										});

										document.getElementById("dat").innerHTML='<input id="datepicker" type="text" style="display:none;"  placeholder="اضغط هنا لاختيار موعد الحجز" name="date" value=""  class="datepicker form-control" autocomplete="off" readonly/>';
										return;
									}
                                    document.cookie = "appoinment_date="+appoinment_date+";secure"; 
                                    $("body").css("cursor","progress");
                                    $("#register").prop("disabled",true);
                                     $.ajax({
                                        type:"POST",
                                        data:myArray,
                                        url:"API/register.php",
                                        success:function(data){
                                            if(data.trim().indexOf("cannot") > -1) {

                                            Swal.fire({
                                                title:"تحذير",
                                                icon:"error",
                                                text:"حدث خطأ , يرجى المحاولة لاحقا"
                                            });
                                            $("body").css("cursor","default");
                                          $("#register").prop("disabled",false);

                                            } 
                                            else if(data.trim().indexOf("success") > -1) {

												Swal.fire({
													title:"انتظار",
													icon:"info",
													showConfirmButton : false,
													allowOutsideClick : false,
													text:"تم تثبيت الموعد بنجاح , يرجى انتظار واجهة معلومات الحجز و الرسالة"
												});

                                                window.location="appointment.php?status=reg";
                                              
                                            } 
											else if(data.trim() == "End")
											{
												Swal.fire(
													{text : "لا يوجد مواعيد متاحة حاليا",
													icon : "error",
													title : "عذرا"
													});
												$("body").css("cursor","default");
                                                $("#register").prop("disabled",false);

												return;
											}
                                            else if(data.trim() == "exists"){
												Swal.fire({
													title:"تحذير",
													icon:"error",
													text:"هناك حجز مسبق"
												});

                                                $("body").css("cursor","default");
                                                $("#register").prop("disabled",false);
												return;
                                            }
                                        },
										fail: function(xhr, textStatus, errorThrown){
											Swal.fire({
												title:"تحذير",
												icon:"error",
												text:"حدثت مشكلة , يرجى المحاولة لاحقا"
											});
											$("body").css("cursor","default");
											 $("#register").prop("disabled",false);
										 },
										 error: function(xhr, status, error){
											 
											Swal.fire({
												title:"تحذير",
												icon:"error",
												text:"حدثت مشكلة , يرجى المحاولة لاحقا"
											});
											$("body").css("cursor","default");
											   $("#register").prop("disabled",false);
										}
                                });
                            } 
                            document.getElementById("dat").innerHTML='<input id="datepicker" type="text" style="display:none;"  placeholder="اضغط هنا لاختيار موعد الحجز" name="date" value=""  class="datepicker form-control" autocomplete="off" readonly/>';

                           
                        });
                        },
						fail: function(xhr, textStatus, errorThrown){
							
							$("body").css("cursor","default");
                             $("#register").prop("disabled",false);
						 },
						 error: function(data){
							
							$("body").css("cursor","default");
                               $("#register").prop("disabled",false);
						}
            }); 
   }
   else {

            $("#msgdiv").html("يرجى استكمال كافة البيانات");
     
       }
    });

    $("#back").click(function() {
        window.location="index.php";
    });
}); 
    