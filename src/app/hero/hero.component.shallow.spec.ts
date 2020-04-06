import {TestBed, ComponentFixture} from '@angular/core/testing'
import { HeroComponent } from './hero.component'
import {NO_ERRORS_SCHEMA} from '@angular/core'
import { Hero } from '../hero'
import { By } from '@angular/platform-browser'


describe('HeroComponent(ShallowTest)',()=>{
    let fixture : ComponentFixture<HeroComponent>

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        })
        fixture =TestBed.createComponent(HeroComponent)
    })
    it('should have the correct hero',()=>{
        fixture.componentInstance.hero={
            id:1,name:'Pooh',strength:23
        }
        expect(fixture.componentInstance.hero.name).toEqual('Pooh')
    })
    //accessing a tag in html using nativeElement
    // it('should render the hero name in an anchor tag',()=>{
    //     fixture.componentInstance.hero={id:1,name:'Pooh',strength:23}
    //     fixture.detectChanges();
    //     expect(fixture.nativeElement.querySelector('a').
    //     textContent).toContain('Pooh')
    // })
 //accessing a tag in html using debugElement
    // it('should render the hero name in an anchor tag',()=>{
    //     fixture.componentInstance.hero={id:1,name:'Pooh',strength:23}
    //     fixture.detectChanges();
        
    //     expect(fixture.debugElement.query(By.css('a')).nativeElement.
    //     textContent).toContain('Pooh')
    // })

    it('should render the hero name in an anchor tag',()=>{
        fixture.componentInstance.hero={id:1,name:'Pooh',strength:23}
        fixture.detectChanges();
        let deA = fixture.debugElement.query(By.css('a'))
        expect(deA.nativeElement.textContent).toContain('Pooh')
    })
})

