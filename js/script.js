$( document ).ready(function() {
    $('#nav-avatar').hide();
   
    $('#nav-notificaciones').hide();
   
    $(".popUp-buscador").hide(); 
   
    $('.nav-home').click(load_home);
   
    $('#nav-peliculas').click(function(){
        load_filtros_resultados(true,false);
    });
   
    $('#nav-series').click(function(){
        load_filtros_resultados(false,false);
    });
   
    $('#btn-realizar-busqueda').click(function(){
        let valBusqueda = $('#input-search').val();
        $(".popUp-buscador").hide();
        load_filtros_resultados(false,true,valBusqueda);
        $('#input-search').val("");
    });
   
    $('#btn-search').click(function(){ 
        $(".popUp-buscador").show();
    });
    
    $('#btn-cerrar-popUp-search').click(function(){ 
        $(".popUp-buscador").hide();
    });
   
    load_login();
   
});
   
function load_home(){
    $.get('home.html', function(response){
        $('#container-principal').html(response);
    
        $('#avatar-btn-header').click(function(){
            $('#nav-avatar').toggle();
        });
    
        $('#btn-notifications').click(function(){
            $('#nav-notificaciones').toggle();
        });
    
        $("#nav_ayuda").click(function(){
            load_ayuda();
            $('#nav-avatar').toggle();
        }); 
        // create_carruseles();
        $(".card-top-hover").hide();
    
        $(".btn-ant-carrusel").hide(); 
    
        $('.popUp-preview').each(function() {
            $( this ).hide();
        }); 
    
        /*let p = document.createElement("p");
        p.classList.add("card");
        p.appendChild(document.createTextNode("Hola"));
        $('#container-home').append(p);*/
    
        $('.card').hover(function() {
            // console.log($('.card').parent().parent(".section-carrusel"));
            // id data $(this) para pasar obj a popup
            //leer coordenadas de puntero
        
            /*let x = event.clientX;
            //screen.width;
            if((x>300)&&(x<500))
            console.log("hola");
            else if((x>500)&&(x<650))
            console.log("hola2");
            */
            //mostrar popup segun coordenadas
        }); 
    
        $('.card-numero-top').each(function() {
            $( this ).hover(function(){
                $(this).children(".card-top-hover").toggle();
            });
        });
    
        $('.btn-next-carrusel').each(function() {
            $( this ).hover(function(){
                $(this).toggleClass("btn-carrusel-hover");
            });
            $( this ).click(function(){
                $(".btn-ant-carrusel").show(); 
                let val_x = $( this ).siblings('.div-carrusel-translate').attr("data-valx");
                val_x = val_x-17;
                $( this ).siblings('.div-carrusel-translate').css(
                    {
                    "transform": "translateX("+val_x+"%)", 
                    "transition": "1s"
                    
                    }
                );
                $( this ).siblings('.div-carrusel-translate').attr("data-valx", val_x);
                //let id_carrusel = $(this).attr("data-idcarrusel");
                if((val_x == 0) || (val_x == "")){
                    $(".btn-ant-carrusel").hide(); 
                }
            });
        });
    
        $('.btn-ant-carrusel').each(function() {
            $( this ).hover(function(){
                $(this).toggleClass("btn-carrusel-hover");
            });
            $( this ).click(function(){
                let val_x = $( this ).siblings('.div-carrusel-translate').attr("data-valx");
                val_x = parseInt(val_x)+17;
                $( this ).siblings('.div-carrusel-translate').css(
                    {
                    "transform": "translateX("+val_x+"%)", 
                    "transition": "1s"
                    
                    }
                );
                $( this ).siblings('.div-carrusel-translate').attr("data-valx", val_x);
                //let id_carrusel = $(this).attr("data-idcarrusel");
                if((val_x == 0) || (val_x == "")){
                    $(".btn-ant-carrusel").hide(); 
                }
            });
        });
    
        $('#btn-top-next').hover(function(){
            $(this).toggleClass("btns-top-hover");
        });
    });
    
}
   
function load_faq(){
    $.get('faq.html', function(response){
        $('#container-principal').html(response);
    
        $('.desplegable-info').each(function(){
            $(this).hide();
        });
        $('.div-desplegable-faq').each(function(){
            $(this).click(function(){
                if($(this).attr('data-desplegado') == "false"){
                    $(this).css({
                        "backgroundColor" : "var(--Primario1)",
                        "borderTop": "1px solid rgba(255, 238, 238, 0.16)",
                        "borderRight": "1px solid rgba(255, 238, 238, 0.16)",
                        "borderLeft": "1px solid rgba(255, 238, 238, 0.16)",
                        "marginBottom" : "0px"
                    });
                    
                    $(this).children('.img-desplegable').css({
                        "transform" : "rotate(270deg)"
                    });
                    
                    $(this).siblings(".desplegable-info").show(); 
                
                    $(this).attr('data-desplegado',"true");
                
                } else if($(this).attr('data-desplegado') == "true"){
                    $(this).css({
                        "backgroundColor" : "var(--Secundario2)",
                        "border" : "none",
                        "marginBottom" : "20px"
                    });
                
                    $(this).children('.img-desplegable').css({
                        "transform" : "rotate(90deg)",
                    });
                    
                    $(this).siblings(".desplegable-info").hide();
                    
                    $(this).attr('data-desplegado',"false");
                }
            });
        });
        
        $('#ayuda-link').click(load_ayuda);
    });
}
   
function load_login(){
    $.get('login.html', function(response){
        $('#container-principal').html(response);
        
        $('#btn-form-iniciar-sesion').click(function(){
            load_home();
        });
    
        $('#link-suscribirse').click(function(){
            load_suscripcion();
        });
    });
}
   
function load_suscripcion(){
    $.get('suscripcion.html', function(response){
        $('#container-principal').html(response);
    
        $('.card-plan').each(function(){
        $(this).click(function(){
            $(this).toggleClass("card-plan-click");
            $(this).siblings('.card-plan').removeClass("card-plan-click");
            });
        });
    
        $('.flecha_back').each(function(){
        $(this).click(function(){
            let dataDir = $(this).attr('data-direccionBack');
            switch(dataDir){
                case 'login':
                load_login();
                break;
                case 'paso_1':
                view_paso_1();
                break;
                case 'paso_2':
                view_paso_2();
                break;
            }
        });
    });
   
    view_paso_1();
   
    });
}

function load_ayuda(){
    $.get('ayuda.html', function(response){
        $('#container-principal').html(response);
        $('.container_label_input').each(function(){
            $(this).val("");
        });
        $('#link-faq-desde-ayuda').click(load_faq);
    });
}

function view_paso_1(){
    $.get('paso_1.html', function(response){
        $('#container-subsecciones-suscripcion').html(response);
        $('.flecha_back').attr("data-direccionBack", "login");
        $('.p-pasos').html("Paso 1/3");
        $('.title-suscripcion').html("Elige tu plan");
        $('#btn-continuar-suscripcion').click(view_paso_2);
    });
}
   
function view_paso_2(){
    $.get('paso_2.html', function(response){
        $('#container-subsecciones-suscripcion').html(response);
        $('.flecha_back').attr("data-direccionBack", "paso_1");
        $('.p-pasos').html("Paso 2/3");
        $('.title-suscripcion').html("Pago");
        $('#btn-pagar-suscripcion').click(view_paso_3);
    });
}
   
function view_paso_3(){
        $.get('paso_3.html', function(response){
        $('#container-subsecciones-suscripcion').html(response);
        $('.flecha_back').attr("data-direccionBack", "paso_2");
        $('.p-pasos').html("Paso 3/3");
        $('.title-suscripcion').html("Crear perfil");
        $('#btn-listo-suscripcion').click(load_home);
    });
}
   
function load_filtros_resultados(peliculas, resultado, valBusqueda = null){
    $.get('filtros_resultados.html', function(response){
        $('#container-principal').html(response);
        let h1_val ="";
        if(peliculas){
            $(".title-tipo-all").html("Peliculas");
        }else{
            if(resultado){
                if(valBusqueda != null){
                    h1_val = "Resultados de la búsqueda para: "+valBusqueda;
                }else{
                    h1_val = "Resultados de la búsqueda para: ";
                }
                $(".title-tipo-all").html(h1_val).css(
                    {
                    "marginLeft" : "0%",
                    "marginBottom": "0px"
                    }
                );
                $('#container-tipo-all').css({
                    "alignItems" : "start"
                });
                $(".carrusel-filtro-generos").hide(); 
                //get_resultados(valBusqueda);
                //armar cards con el resultado
            }else{
                $(".title-tipo-all").html("Series");
            }
        } 
    
        $(".btn-filtrar-genero").each(function() {
            $(this).click(function(){
            alert($(this).attr("data-genero"));
            })
        });
    
        $(".btn-ant-carrusel-genero").hide(); 
    
        $(".btn-next-carrusel-genero").each(function() {
            $(this).hover(function(){
                $(this).toggleClass("btn-carrusel-genero-hover");
            });
            $(this).click(function(){
                $(".btn-ant-carrusel-genero").show(); 
                let val_x = $( this ).siblings('.div-carrusel-generos-translate').attr("data-valx");
                val_x = val_x-10;
                $( this ).siblings('.div-carrusel-generos-translate').css(
                    {
                    "transform": "translateX("+val_x+"%)", 
                    "transition": "1s"
                    }
                );
                $( this ).siblings('.div-carrusel-generos-translate').attr("data-valx", val_x);
                if((val_x == 0) || (val_x == "")){
                    $(".btn-ant-carrusel-genero").hide(); 
                }
            });
        });
    
        $(".btn-ant-carrusel-genero").each(function() {
            $(this).hover(function(){
                $(this).toggleClass("btn-carrusel-genero-hover");
            });
            $(this).click(function(){
                let val_x = $( this ).siblings('.div-carrusel-generos-translate').attr("data-valx");
                val_x = parseInt(val_x)+10;
                $( this ).siblings('.div-carrusel-generos-translate').css(
                    {
                    "transform": "translateX("+val_x+"%)", 
                    "transition": "1s"
                    }
                );
                $( this ).siblings('.div-carrusel-generos-translate').attr("data-valx", val_x);
                if((val_x == 0) || (val_x == "")){
                    $(".btn-ant-carrusel-genero").hide(); 
                }
            });
        });
    
        $(".card-top-hover").hide();
    
        $(".popUp-preview").each(function() {
        $( this ).hide();
        }); 
    
        /*let p = document.createElement("p");
        p.classList.add("card");
        p.appendChild(document.createTextNode("Hola"));
        $('#container-home').append(p);*/
        $('.card').hover(function() {
        //console.log($('.card').parent().parent(".section-carrusel"));
        // id data $(this) para pasar obj a popup
        //leer coordenadas de puntero
    
        /*let x = event.clientX;
        //screen.width;
        if((x>300)&&(x<500))
        console.log("hola");
        else if((x>500)&&(x<650))
        console.log("hola2");
        */
        //mostrar popup segun coordenadas
        }); 
   
    });
}
   
let obj_categorias = 
    [
        {
            "id" : 1,
            "tipo" : "pelicula",
            "nombre" : "Nombre de la pelicula",
            "sinopsis" : "Loren ipsum, loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum",
            "duracion" : "1:37",
            "fechaEstreno" : "2022-10-11T22:53:54.969Z",
            "generos" : ["terror","comedia"],
            "formatos" : ["a","b"],
            "elenco" : ["Nombre uno", "nombre dos", "nombre tres"],
            "direccion" : ["nombre", "nombredos"],
            "clasificacion" : 13,
            "calificacion" : 5.3
        },
        {
            "id" : 2,
            "tipo" : "serie",
            "nombre" : "Un juego de caballeros",
            "sinopsis" : "Un momento trascendental en la historia del deporte se fusiona con un majestuoso drama de época en esta serie de Julian Fellowes, el creador de «Downton Abbey».",
            "fechaEstreno" : "2020-10-11T22:53:54.969Z",
            "generos" : ["De época", "Drama"],
            "formatos" : ["a","b"],
            "elenco" : ["Nombre uno", "nombre dos", "nombre tres"],
            "direccion" : ["nombre", "nombre dos"],
            "clasificacion" : 13,
            "calificacion" : 5.3,
            "temporadas" : [
                {
                "id" : 1,
                "fechaEstreno" : "2020-10-11T22:53:54.969Z",
                "episodios" : [
                    {
                    "id" : 1,
                    "nombre" : "Nombre episodio",
                    "sinopsis" : "El dueño de una fábrica algodonera de un pueblo obrero contrata a dos futbolistas de Escocia para que se unan al equipo local con la esperanza de ganar la copa de la FA.",
                    "fechaEstreno" : "2020-10-11T22:53:54.969Z",
                    },
                    {
                    "id" : 2,
                    "nombre" : "Nombre episodio2",
                    "sinopsis" : "Mientras Fergus revitaliza el club de fútbol, el ánimo en las fábricas se empieza a caldear tras el anuncio de un recorte salarial. Arthur recibe una propuesta comercial.",
                    "fechaEstreno" : "2020-10-18T22:53:54.969Z",
                    },
                    {
                    "id" : 3,
                    "nombre" : "Nombre episodio3",
                    "sinopsis" : "El dueño de una fábrica algodonera de un pueblo obrero contrata a dos futbolistas de Escocia para que se unan al equipo local con la esperanza de ganar la copa de la FA.",
                    "fechaEstreno" : "2020-10-25T22:53:54.969Z",
                    } ,
                    {
                    "id" : 4,
                    "nombre" : "Nombre episodio3",
                    "sinopsis" : "El dueño de una fábrica algodonera de un pueblo obrero contrata a dos futbolistas de Escocia para que se unan al equipo local con la esperanza de ganar la copa de la FA.",
                    "fechaEstreno" : "2020-10-25T22:53:54.969Z",
                    } ,
                    {
                    "id" : 5,
                    "nombre" : "Nombre episodio3",
                    "sinopsis" : "El dueño de una fábrica algodonera de un pueblo obrero contrata a dos futbolistas de Escocia para que se unan al equipo local con la esperanza de ganar la copa de la FA.",
                    "fechaEstreno" : "2020-11-01T22:53:54.969Z",
                    } ,
                    {
                    "id" : 6,
                    "nombre" : "Nombre episodio3",
                    "sinopsis" : "El dueño de una fábrica algodonera de un pueblo obrero contrata a dos futbolistas de Escocia para que se unan al equipo local con la esperanza de ganar la copa de la FA.",
                    "fechaEstreno" : "2020-11-08T22:53:54.969Z",
                    } ,
                    {
                    "id" : 7,
                    "nombre" : "Nombre episodio3",
                    "sinopsis" : "El dueño de una fábrica algodonera de un pueblo obrero contrata a dos futbolistas de Escocia para que se unan al equipo local con la esperanza de ganar la copa de la FA.",
                    "fechaEstreno" : "2020-11-15T22:53:54.969Z",
                    } 
                ]
                },
                {
                "id" : 2,
                "fechaEstreno" : "2023-02-12T22:53:54.969Z",
                "episodios" : [
                    {
                    "id" : 1,
                    "nombre" : "Nombre episodio",
                    "sinopsis" : "Detalleeeeee",
                    "fechaEstreno" : "2023-02-12T22:53:54.969Z",
                    },
                    {
                    "id" : 2,
                    "nombre" : "Nombre episodio2",
                    "sinopsis" : "Detalleeeeee",
                    "fechaEstreno" : "2023-02-12T22:53:54.969Z",
                    },
                    {
                    "id" : 3,
                    "nombre" : "Nombre episodio3",
                    "sinopsis" : "Detalleeeeee",
                    "fechaEstreno" : "2023-02-12T22:53:54.969Z",
                    } 
                ]
                }
            ]
        }
];
function create_carruseles(){
    
}