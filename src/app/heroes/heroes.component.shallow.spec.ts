import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from './heroes.component'
import { HeroService } from '../hero.service'
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter, 
    CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'
import { Hero } from '../hero'
import { By } from '@angular/platform-browser'

describe('HeroesComponent(Shallow Tests)',()=>{

    let HEROES
    
    let fixture:ComponentFixture<HeroesComponent>
    let mockHeroService

    @Component({
        selector:'app-hero',
        template:`<div></div>`
    })
     class FakeHeroComponent{
        @Input() hero:Hero
        //@Output() delete = new EventEmitter()
    }

    beforeEach(()=>{
      HEROES=[ 
            {id:1, name:'Tom', strength:10},
            {id:2,name:'Jerry',strength:4},
            {id:3,name:'Pooh',strength:20}
    ]
        mockHeroService=jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'

        ])
        TestBed.configureTestingModule({
            declarations:[HeroesComponent,
            FakeHeroComponent],
            providers:[
                {provide:HeroService,useValue:mockHeroService}
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA]
        })
        fixture= TestBed.createComponent(HeroesComponent)
    })
    it('should do nothing',()=>{
        expect(true).toBe(true)
    })
    it('should set heroes correctly from the service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges()
        expect(fixture.componentInstance.heroes.length).toBe(3)
    })
    it('should create one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        fixture.detectChanges()
        console.log(fixture.debugElement.queryAll(By.css('li')) + 'Shallow')
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3)
    })
    
})