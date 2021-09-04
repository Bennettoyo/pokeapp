import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})


export class PokemonComponent implements OnInit {

  public pokemon: any = [];
  public tempPokemon: any = [];
  public localPokemon: any = [];
  public pokemonDescription: any;
  public currentPokemonId = 1;
  public batchOfPokemon = 48;
  public closeModal: any;
  public pokemonName: any;
  public pokemonPicBack: any;
  public pokemonPicFront: any;
  public pokemonWeight: any;
  public pokemonHeight: any;


  constructor(public httpService: HttpService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.gettingPokemonBatch();
  }

  gettingPokemonBatch() {
    // debugger;
    this.localPokemon = JSON.parse(localStorage.getItem("pokemonData") || "[]");
    if (this.localPokemon.length >= 863) {
      this.getLocalPokemon();
      if (this.currentPokemonId - 1 == this.batchOfPokemon) {
        this.batchOfPokemon += 48;
        this.pokemon = this.tempPokemon;
      }
    } else {
      this.getPokemon();
      if (this.currentPokemonId - 1 == this.batchOfPokemon) {
        this.batchOfPokemon += 48;
        this.pokemon = this.tempPokemon;
      }
    }
    $(".card").fadeIn();
    window.localStorage.setItem('pokemonData', JSON.stringify(this.pokemon));
  }

  getPokemon() {
    for (this.currentPokemonId = this.currentPokemonId; this.currentPokemonId <= this.batchOfPokemon; this.currentPokemonId++) {
      this.httpService.get(this.currentPokemonId).subscribe((rs: any) => {
        this.createObject(rs);
        this.tempPokemon.sort((a: any, b: any) => {
          return a.id - b.id;
        });
      }, (err) => {
      });
    }
  }

  getLocalPokemon() {
    for (this.currentPokemonId = this.currentPokemonId; this.currentPokemonId <= this.batchOfPokemon; this.currentPokemonId++) {
      this.createLocalObject(this.localPokemon[this.currentPokemonId]);
      this.tempPokemon.sort((a: any, b: any) => {
        return a.id - b.id;
      });
    }
  }

  createObject(rs: any) {
    let pokeObj: any = {};
    pokeObj.spriteFront = rs.sprites.front_default;
    pokeObj.spriteBack = rs.sprites.back_default;
    pokeObj.name = rs.name;
    pokeObj.types = rs.types;
    pokeObj.height = rs.height;
    pokeObj.weight = rs.weight;
    pokeObj.id = rs.id;
    this.tempPokemon.push(pokeObj);
  }

  createLocalObject(rs: any) {
    let pokeObj: any = {};
    pokeObj.spriteFront = rs.spriteFront;
    pokeObj.spriteBack = rs.spriteBack;
    pokeObj.name = rs.name;
    pokeObj.types = rs.types;
    pokeObj.height = rs.height;
    pokeObj.weight = rs.weight;
    pokeObj.id = rs.id;
    this.tempPokemon.push(pokeObj);
  }

  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getSpecies(poke: any) {
    this.emptyModal();
    this.httpService.getSpecies(poke.id).subscribe((rs: any) => {
      if (rs != null && rs.flavor_text_entries.length > 0) {
        for (let d = 1; d <= rs.flavor_text_entries.length; d++) {
          if (rs.flavor_text_entries[d].language.name == "en") {
            let flavourText = rs.flavor_text_entries[d].flavor_text.replace("\f", ' ');
            this.pokemonDescription = flavourText;
            this.pokemonName = poke.name;
            this.pokemonHeight = (poke.height * 10) + " Centimeters"
            this.pokemonWeight = (poke.weight / 10) + " Kilograms"
            this.pokemonPicFront = poke.spriteFront;
            this.pokemonPicBack = poke.spriteBack;
            break;
          }
        }
      }
    }, (err) => {
      alert("Looks like something's gone wrong!");
    });
  }

  emptyModal() {
    this.pokemonName = "";
    this.pokemonDescription = "";
    this.pokemonPicBack = "";
    this.pokemonPicFront = "";
    this.pokemonWeight = "";
    this.pokemonHeight = "";
  }


}
