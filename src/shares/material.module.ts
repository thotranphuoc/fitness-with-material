import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const materialModules = [
    MatButtonModule,
    MatIconModule
] 
@NgModule({
    imports: materialModules, // posible to comment this
    exports: materialModules
})
export class MaterialModule{

}