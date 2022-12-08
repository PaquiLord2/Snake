var canv = document.getElementById('culebrita')
   var ctx = canv.getContext("2d")
 
  const $puntaje = document.getElementById("puntaje")
  const $porcentaje = document.getElementById("porcentaje")
   let puntss = 0;
   let porc = 0.0;
   class Nodo{
    constructor(data,next,prev){
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
   }

   class Cule{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
        
    }
   agregarCola(data){
        const nuevoNodo = new Nodo(data,this.head,null)
        if (this.tail){
            nuevoNodo.next = this.head;
            this.head.prev = nuevoNodo;
            this.head = nuevoNodo
        }else{
            this.tail = nuevoNodo;
            this.head = nuevoNodo;
        }
  this.size++
     }

     agregarCabeza(data){
      const nuevoNodo = new Nodo(data,null,this.tail)
      if (this.tail){
          nuevoNodo.prev = this.tail;
          this.tail.next = nuevoNodo;
          this.tail = nuevoNodo
      }else{
          this.tail = nuevoNodo;
          this.head = nuevoNodo;
      }
this.size++
   }
      
     dibujar(contexto){
        let cabeza = this.head;

         while(cabeza){
         
        contexto.fillRect(cabeza.data.xpos,cabeza.data.ypos,cabeza.data.xfin,cabeza.data.yfin)
         cabeza = cabeza.next
         }        
     }

     moverDireccion(contexto,direccion){
         let dirx = 0;
         let diry = 0;
        if (direccion === "izquierda"){
            dirx = -10;
        }
        if (direccion === "derecha"){
          dirx = 10;
        }
        if (direccion === "abajo"){
          diry = 10;
        }
        if (direccion === "arriba"){
         diry = -10;
         }
        
        let actual = this.head;
        let inter = this.size;

        let inicio_y,inicio_x;
        let nueva_y,nueva_x;

        let npos_y,npos_x,posii;
        for (let x=0;x<inter;x++){
        
             if (x===0){
            inicio_y = actual.data.ypos
            inicio_x = actual.data.xpos
            contexto.clearRect(inicio_x, inicio_y,actual.data.xfin,actual.data.yfin)
            nueva_y = inicio_y + diry;
            nueva_x = inicio_x + dirx;
            actual.data.ypos = nueva_y;
            actual.data.xpos = nueva_x;
          
            contexto.fillRect(actual.data.xpos, actual.data.ypos,actual.data.xfin,actual.data.yfin)
             }else{
            
             npos_y = actual.data.ypos;
             npos_x = actual.data.xpos;
             contexto.clearRect(npos_x, npos_y,actual.data.xfin,actual.data.yfin)
             actual.data.ypos = inicio_y;
             actual.data.xpos = inicio_x;
                        
             inicio_y = npos_y; 
             inicio_x = npos_x;
             contexto.fillRect(actual.data.xpos, actual.data.ypos,actual.data.xfin,actual.data.yfin)
            }

              
            actual = actual.next
        } 
     
      return [inicio_x, inicio_y]
     }

     colisionDeteccion(){
          let actual = this.head
          let cuerpo = actual.next
          let perdio = 0;
          if (this.size <= 1){
          
            if ((actual.data.xpos >= 500)||(actual.data.xpos < 0)||(actual.data.ypos < 0)||(actual.data.ypos >= 500))
            {
              window.alert("Ha perdido")
              location.reload()
              
            }
          }else{
          for (let x=0;x<this.size-1;x++){
            if ((actual.data.xpos === cuerpo.data.xpos)&&(actual.data.ypos === cuerpo.data.ypos))
            {
              perdio++;
              
            }
            if ((actual.data.xpos >= 500)||(actual.data.xpos < 0)||(actual.data.ypos < 0)||(actual.data.ypos >= 500))
            {
              perdio++;
              
            }
            cuerpo = cuerpo.next
           }
          }
          if (perdio>=1){
            window.alert("Ha perdido")
              location.reload()
          }

     }
      
     colisionManzana(manzanita,contexto,x,y){
      let val = false
         if ((this.head.data.xpos=== manzanita.xpos) && (this.head.data.ypos === manz.ypos))
         {
          const rect = new Rectangulo(x,y,10,10)
          this.agregarCabeza(rect)
          manzanita.aleatorio(this.head);
          manzanita.dibujar(contexto)
          val = true;
         }
         return val
     }
   }

   class Rectangulo{
    constructor(xpos,ypos,xfin,yfin){
        this.xpos = xpos;
        this.ypos = ypos;
        this.xfin = xfin;
        this.yfin = yfin;
    }   
   }

   class Manzana extends Rectangulo{
      constructor(xpos,ypos,xfin,yfin){
        super(xpos,ypos,xfin,yfin)
      }

      aleatorio(lista_cule){
        let x = Math.round((Math.random()*(490-0)+0)/10)*10;
        let y = Math.round((Math.random()*(490-0)+0)/10)*10;
         
        let cabeza = lista_cule;
        while (cabeza){
          if((cabeza.data.xpos === x)&&(cabeza.data.ypos === y)){
            x = Math.round((Math.random()*(490-0)+0)/10)*10;
            y = Math.round((Math.random()*(490-0)+0)/10)*10;
            cabeza = lista_cule;
          }else{
          
          cabeza = cabeza.next
        }
        }
        this.ypos = y;
        this.xpos = x;
      }
  
      dibujar(contexto){
        contexto.fillRect(this.xpos,this.ypos,this.xfin,this.yfin);      
      }
   }

   const nod = new Cule();
   const rect = new Rectangulo(30,20,10,10)
 
   nod.agregarCola(rect)

   nod.dibujar(ctx)
   porc = 0.03
   $puntaje.textContent = puntss
   $porcentaje.textContent = ((porc*100)/75).toFixed(2)
  var IdIntervalo;
  var tiempo = 100.0;
  const empezar =(cts,direccion)=>{
      IdIntervalo = setInterval(llamada,tiempo);
      function llamada(){
        ultx = nod.moverDireccion(cts,direccion);
        nod.colisionDeteccion();
        if (nod.colisionManzana(manz,cts,ultx[0],ultx[1])){
          

          if(porc<=1.70)
        {
          porc = porc + .03; 
          tiempo = tiempo - porc
        }
          
        puntss=puntss+10;
        $puntaje.textContent = puntss
        $porcentaje.textContent = ((porc*100)/75).toFixed(2)
        if(puntss === 25000){
          console.log("Ha ganado")
           location.reload()
        }
        console.log(tiempo)
        };
        clearInterval(IdIntervalo);
        IdIntervalo = setInterval(llamada,tiempo)
      }
      

  }
  const terminar = () =>{
    clearInterval(IdIntervalo);
  }
  
  const manz = new Manzana (30,50,10,10);
  manz.dibujar(ctx)
  let ultx = []
  let tactual,tanterior;
  this.addEventListener("keypress",(e)=>{
    terminar();
    tanterior = tactual 
    tactual = e.keyCode;
    if(tactual === 115){
      terminar();
      if (tanterior !== 119){
    empezar(ctx,"abajo")
      }else{
        tactual = tanterior
      }
    }
    if (tactual === 97){
      terminar();
      if(tanterior !== 100){
      empezar(ctx,"izquierda")
      }else{
        tactual = tanterior
      }

    } 
    if (tactual === 100){
      terminar();
      if(tanterior !== 97){
      empezar(ctx,"derecha") }
      else{
        terminar();
        empezar(ctx,"izquierda")
        tactual = tanterior
      }
    }

    if(tactual === 119){
      terminar();
      if (tanterior !== 115){
      empezar(ctx,"arriba") 
    }else{
      terminar();
      empezar(ctx,"abajo")
      tactual = tanterior;
    }
    }
    
  })
  
