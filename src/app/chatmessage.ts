import { ReturnStatement } from "@angular/compiler";

export class ChatMessage {
    message:string;
    timestamp:string;
    from: string;
    to:string;

    getMessage(){
        return this.message;
    }

    setMessage(message:string){
        this.message = message;
    }

    getTimestamp(){
        return this.timestamp;
    }

    setTimeStamp(timestamp:string){
        this.timestamp = timestamp;
    }

    getFrom(){
        return this.from;
    }

    setFrom(from:string){
        this.from = from;
    }

    getTo(){
        return this.to;
    }

    setTo(to:string){
        this.to = to;
    }



}


