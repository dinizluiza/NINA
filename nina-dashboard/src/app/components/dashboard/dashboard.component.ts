import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  places: string[] = [
    'Ônibus',
    'Terminal de ônibus',
    'Metrô',
    'Parada de ônibus',
    'Estação de metrô',
  ];
  types: string[] = [
    'Se tocando/mostrando',
    'Perseguição',
    'Fotos não autorizadas',
    'Intimidação',
    'Encoxar/apalpar',
  ];
  moments: string[] = ['No momento', 'Após o ocorrido'];
  genders: string[] = [
    'Mulher Cis',
    'Homem Cis',
    'Mulher Trans',
    'Homem Trans',
    'Não-binárie',
  ];
  // Mapeamento para lugares
  placeMapping: { [key: string]: string } = {
    Ônibus: 'bus',
    'Terminal de ônibus': 'bus_terminal',
    Metrô: 'subway',
    'Parada de ônibus': 'bus_stop',
    'Estação de metrô': 'subway_terminal',
  };
  // Mapeamento para lugares
  typeMapping: { [key: string]: string } = {
    'Se tocando/mostrando': 'groping',
    Perseguição: 'stalking',
    'Fotos não autorizadas': 'unwanted_photos',
    Intimidação: 'verbal_agression',
    'Encoxar/apalpar': 'physical_agression',
  };
  momentMapping: { [key: string]: boolean } = {
    'No momento': true,
    'Após o ocorrido': false,
  };
  genderMapping: { [key: string]: string } = {
    'Mulher Cis': 'woman_cis',
    'Homem Cis': 'man_cis',
    'Mulher Trans': 'woman_trans',
    'Homem Trans': 'man_trans',
    'Não-binárie': 'non-binary',
  };

  selectedPlace: string | undefined;
  selectedType: string | undefined;
  selectedMoment: string | undefined;
  selectedGender: string | undefined;
  selectedAge: number = 0;

  complaints$: any[] = [];

  constructor(
    private complaintService: ComplaintService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getComplaints();
  }

  clearFilters(): void {
    this.selectedPlace = undefined;
    this.selectedType = undefined;
    this.selectedMoment = undefined;
    this.selectedGender = undefined;
    this.selectedAge = 0;
    this.getComplaints();
  }

  formatDateTime(datetime: string): string {
    const date = new Date(datetime);
    // return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return `${date.toLocaleDateString()}`;
  }

  onAgeRangeChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    this.selectedAge = value;
  }

  replacePlaceName(place: string): string {
    if (place === 'bus') {
      return 'Ônibus';
    } else if (place === 'bus_terminal') {
      return 'Terminal de ônibus';
    } else if (place === 'subway') {
      return 'Metrô';
    } else if (place === 'bus_stop') {
      return 'Parada de ônibus';
    } else if (place === 'subway_terminal') {
      return 'Estação de metrô';
    }
    return place;
  }

  replaceTypeName(types: string[]): string {
    const typeMapping: { [key: string]: string } = {
      groping: 'Se tocando/mostrando',
      stalking: 'Perseguição',
      unwanted_photos: 'Fotos não autorizadas',
      verbal_aggression: 'Intimidação',
      physical_aggression: 'Encoxar/apalpar',
    };

    const replacedTypes = types.map((type) => typeMapping[type] || type);
    return replacedTypes.join(', ');
  }

  getComplaints(): void {
    console.log('Selected Place:', this.selectedPlace);
    console.log('Selected Type:', this.selectedType);
    console.log('Selected Moment:', this.selectedMoment);
    console.log('Selected Gender:', this.selectedGender);
    console.log('Selected Age:', this.selectedAge);
    this.complaintService
      .getComplaints(
        this.selectedPlace,
        this.selectedType,
        this.selectedMoment,
        this.selectedGender,
        this.selectedAge
      )
      .subscribe(
        (complaints) => {
          this.complaints$ = complaints.sort((a, b) => {
            // Ordenar os resultados por data e hora (datetime) em ordem decrescente
            return (
              new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
            );
          });
        },
        (error) => {
          // Exiba a mensagem de erro para o usuário
          console.error(error);
          this.toastr.error('Ocorreu um erro ao buscar as reclamações.', '', {
            timeOut: 5000, // Tempo de exibição da notificação em milissegundos
            closeButton: true,
          });
        }
      );
  }
}
