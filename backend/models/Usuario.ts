import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true,
    },
    token:{
        type: String,
    },
    confirmado :{
        type: Boolean,
        default:false,
    }
},{
    timestamps:true
});

// esto es algo que se ejecuta antes de guardar en BD
usuarioSchema.pre("save", async function(next){
    // esto es para evitar que se vuelva a hashear el password del hash.
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Usuario  = mongoose.model('Usuario',usuarioSchema);
export default Usuario;