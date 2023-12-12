export default class Film{

    id:number = 0;
    title:string = "";
    description:string = "";
    auteur:string = "";
    note:number = 0;
    image:string = "";


    constructor(id:number,title:string,description:string,auteur:string,note:number,image:string){
        this.id=id;
        this.title=title;
        this.description=description;
        this.auteur=auteur;
        this.note=note;
        this.image=image;
    }
}