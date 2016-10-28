import { TestBed } from '@angular/core/testing';
import { RootComponent } from 'components/root/root.component.ts';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [RootComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(RootComponent);
        expect(fixture.componentInstance instanceof RootComponent).toBe(true, 'should create RootComponent');
    });
});
