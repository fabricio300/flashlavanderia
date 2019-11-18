import { flatten } from '@angular/compiler'

export class efectos{

    edit=false
    anterioPaso='Servicios'
    actual=1
    tipoDeServicoElegido=1
    verServicios=false
    verUnidades=false
    servicioValido=false
    unidadValida=false

    ///models
    id
    idOfertas
    idPlanchados
    idOtros

    unidad
    servicio
    precio
    descripcion
    titulo

    tiposDeServicios=[
        {title:'Lavandería',
         mal:false,
         icon:'../../../assets/Registro/washing-machine.png',
         id:1
        },
        {
            title: 'Tintoreria',
            mal:false,
            icon:'../../../assets/Registro/suit.png',
            id:2
        },
        {
            title: 'Planchado',
            mal:false,
            icon:'../../../assets/Registro/iron.png',
            id:3
        },{
            title: 'Ofertas o promciones',
            mal:false,
            icon:'../../../assets/Registro/tag.png',
            id:4
        },
        {
            title: 'Otros',
            mal:false,
            icon:'../../../assets/Registro/clipboards.png',
            id:5
        }

    ]

    tiposLavanderia=[
        {
            id:1,
            title:'Ropa',
            mal:false
        },
        {
            id:2,
            title:'Edredónes',
            mal:false
        },
        {
            id:3,
            title:'Covertores',
            mal:false
        },
        {    id:4,
            title:'Sabanas',
            mal:false
        },
        {    id:5,
            title:'Toallas',
            mal:false
        },
        {   id:6,
            title:'Almohadas',
            mal:false
        },
        {   id:7,
            title:'Manteles',
            mal:false
        },
        {    id:8,
            title:'Cortinas',
            mal:false
        }
        
    ]

    serviciosTintoreria=[
        {    id:1,
            title:'Playeras',
            mal:false
        },
        {    id:2,
            title:'Camizas',
            mal:false
        },
        {    id:3,
            title:'Trajes',
            mal:false
        },
        {    id:4,
            title:'Pantalones de Vestir',
            mal:false
        },
        {   id:5,
            title:'Sacos',
            mal:false
        },
        {    id:6,
            title:'Abrigos',
            mal:false
        },
        {    id:7,
            title:'Chalecos',
            mal:false
        },
        {    id:8,
            title:'Chamarras',
            mal:false
        },
        {    id:9,
            title:'Vestidos cortos',
            mal:false
        },
        {    id:10,
            title:'Vestidos largos',
            mal:false
        },
        {    id:11,
            title:'Vestidos de fiesta',
            mal:false
        },
        {    id:12,
            title:'Vestidos de XV años',
            mal:false
        },
        {   id:13,
            title:'Vestidos de novia',
            mal:false
        }


    ]

    unidades=[
        {   
            title:'Kilo',
            mal:false
        },
        {
            title:'Pieza',
            mal:false
        },
        {
            title:'Docena',
            mal:false
        },
        {
            title:'Media docena',
            mal:false
        }
    ]

    constructor(){

    }

    mostrasAddService(){
        document.getElementById('addservicio').style.transition='0.5s'
        document.getElementById('addservicio').style.marginTop="0px"
    }

    ocultarAddService(){
        document.getElementById('addservicio').style.transition='0.5s'
        document.getElementById('addservicio').style.marginTop="-200%"
        this.edit=false
        this.recetear()
    }


    next(id){
        this.ocultarAnterior(this.anterioPaso)
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='100%'
        this.anterioPaso=id
    }


    ocultarAnterior(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='0px'
        
    }

    
    actualNew(id){
        this.recetear()
        this.actual=id
        this.tipoDeServicoElegido=parseInt(id)
        console.log("vvv",this.tipoDeServicoElegido ," id ",id);
        
    }

    vewServicios(servicio ,id){
            this.servicio=servicio
        if(this.servicio==null){
            this.verServicios=true
            this.servicioValido=false
        }else{
            this.verServicios=false
            this.servicioValido=true
            this.id=id
            this.ocultarServices(id)
        }
        console.log("id",this.id );
        
    }

    ocultarServices(id){
            if(this.tipoDeServicoElegido==1){
                this.tiposLavanderia.forEach(element => {
                        if(element.id==id){
                            if(element.mal==true){
                                element.mal=false
                            }else{
                                element.mal=true
                            }
                        }
                });
            }else{
                this.serviciosTintoreria.forEach(element => {
                    if(element.id==id){
                        if(element.mal==true){
                            element.mal=false
                        }else{
                            element.mal=true
                        }
                    }
                });

            }


    }

    vewUnidades(optinin, unidad){
        console.log("optindd",unidad);
        
       
        if(unidad==null){
            this.verUnidades=true
            this.unidadValida=false
            console.log("entrar");
            this.unidades.forEach(element => {
                if(this.unidad==element.title){
                    element.mal=false
                }
            });
        }else{
            this.unidad=unidad
            this.verUnidades=false
            this.unidadValida=true
        }

        if(optinin!=null && this.tipoDeServicoElegido==3)
                optinin.mal=true
    }


    recetear(){
        //this.tipoDeServicoElegido=1
        this.verServicios=false
        this.verUnidades=false
        this.servicioValido=false
        this.unidadValida=false

        ///models
        this.unidad=null
        this.servicio=null
        this.precio=null
        this.descripcion=null
        this.titulo=null
    }
   


    getItem(){
        let item
        let tipo

        switch (this.tipoDeServicoElegido) {
            case 1: item={
                        id:this.id,
                        servicio:this.servicio,
                        unidad:this.unidad,
                        precio:this.precio,
                        descripcion:this.descripcion
                    }
                    tipo=1
                break;
                case 2: item={
                            id:this.id,
                            servicio:this.servicio,
                            unidad:this.unidad,
                            precio:this.precio,
                            descripcion:this.descripcion
                        }
                        tipo=2
                
                break;
                case 3:
                        item={
                            id:this.idPlanchados,
                            unidad:this.unidad,
                            precio:this.precio,
                            descripcion:this.descripcion
                        }
                        tipo=3
                        this.idPlanchados=this.idPlanchados+1
                break;
                case 4:
                        item={
                            id:this.idOfertas,
                            titulo:this.titulo,
                            descripcion:this.descripcion
                        }
                        tipo=4
                        this.idOfertas=this.idOfertas+1
                break;
                case 5:
                        item={
                            id:this.idOtros,
                            titulo:this.titulo,
                            descripcion:this.descripcion
                        }
                        tipo=5
                        this.idOtros=this.idOtros+1
                break;
        
            default:
                break;
        }

        let echo={
            item:item,
            tipo:tipo
        }

        return echo
    }


//-------------formulario-------------------------------------------------------------------------------------------
    vanterior

    forInfo=0

    mostrarRequierd(status){
            if(this.forInfo==status){
                this.forInfo=0
            }else{
                this.forInfo=status
            }
    }
    

}

