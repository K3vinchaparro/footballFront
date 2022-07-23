import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService} from './services/equipos/equipos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  equipoForm!: FormGroup;
  marcadorForm!: FormGroup;
  equipos: any;
  equipo:any;

  constructor(
    public fb: FormBuilder,
    public equipoService: EquiposService,
  ){

  }
    ngOnInit(): void {
      this.equipoForm = this.fb.group({
        id : [''],
        nombreEquipo : ['', Validators.required],
        puntos : [''],
        goles : [''],
      })

      this.marcadorForm= this.fb.group({
        id: [''],
        nombreEquipo : [''],
        puntos : [''],
        goles : [''],
        idP: [''],
        nombreEquipoP : [''],
        puntosP : [''],
        golesP : [''],
      })

    this.equipoService.getAllEquipos().subscribe(res=>{
      this.equipos = res;
      console.log(res);
    },
    error=>{console.log(error)}
    )
  }

    guardarEquipo():void{
      this.equipoService.saveEquipo(this.equipoForm.value).subscribe(res=>{
        this.equipoForm.reset(); 
        this.equipos.push(res);
      },
      error=>{console.log(error)}
      )
    }

    editarEquipo():void{
      if(this.marcadorForm.value.goles>this.marcadorForm.value.golesP){
        this.equipo = {
          "idEquipo":this.marcadorForm.value.id,
          "goles": this.marcadorForm.value.goles,
          "puntos": 3,
        }
        this.equipoService.editarEquipo(this.equipo).subscribe(res =>{
          
        },
        error=>(console.log(error))
        );
        this.equipo = {
          "idEquipo":this.marcadorForm.value.idP,
          "goles": this.marcadorForm.value.golesP,
          "puntos": 0,
        }
        this.equipoService.editarEquipo(this.equipo).subscribe(res =>{
          
        },
        error=>(console.log(error))
        );
        window.location.reload();
      }else if(this.marcadorForm.value.goles<this.marcadorForm.value.golesP){
        this.equipo = {
          "idEquipo":this.marcadorForm.value.id,
          "goles": this.marcadorForm.value.goles,
          "puntos": 0,
        }
        this.equipoService.editarEquipo(this.equipo).subscribe(res =>{
          
        },
        error=>(console.log(error))
        );
        this.equipo = {
          "idEquipo":this.marcadorForm.value.idP,
          "goles": this.marcadorForm.value.golesP,
          "puntos": 3,
        }
        this.equipoService.editarEquipo(this.equipo).subscribe(res =>{
          
        },
        error=>(console.log(error))
        );
        window.location.reload();
      }else{
        this.equipo = {
          "idEquipo":this.marcadorForm.value.id,
          "goles": this.marcadorForm.value.goles,
          "puntos": 1,
        }
        this.equipoService.editarEquipo(this.equipo).subscribe(res =>{
          
        },
        error=>(console.log(error))
        );
        this.equipo = {
          "idEquipo":this.marcadorForm.value.idP,
          "goles": this.marcadorForm.value.golesP,
          "puntos": 1,
        }
        this.equipoService.editarEquipo(this.equipo).subscribe(res =>{
          
        },
        error=>(console.log(error))
        );
        window.location.reload();
      }
      
      }
}
