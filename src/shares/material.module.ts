import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material'
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
const materialModules = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
] 
@NgModule({
    imports: materialModules, // posible to comment this
    exports: materialModules
})
export class MaterialModule{

}