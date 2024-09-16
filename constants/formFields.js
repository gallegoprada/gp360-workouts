const loginFields=[
    {
        labelText:"Correo electrónico",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Correo electrónico"   
    },
    {
        labelText:"Contraseña",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Contraseña"   
    }
]

const signupFields=[
    {
        labelText:"Usuario",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Usuario"   
    },
    {
        labelText:"Correo electrónico",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Correo electrónico"   
    },
    {
        labelText:"Contraseña",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Contraseña"   
    },
    {
        labelText:"Repetir Contraseña",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Repetir Contraseña"   
    }
]

export {loginFields,signupFields}