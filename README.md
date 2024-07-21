# Memoteca

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Builda o projeto
npm install


# installs fnm (Fast Node Manager)
winget install Schniz.fnm
# download and install Node.js
fnm use --install-if-missing 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.15.1`
# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`


Caso o comando fnm use --install-if-missing 20 não funcione:

# Abrir arquivo no Windows

notepad $PROFILE

# Caso arquivo não exista crie

New-Item -Path $PROFILE -Type File -Force

# Abra o arquivo 
notepad $PROFILE

# Adicione a linha 
Invoke-Expression (& { (fnm env) -join "`n" })

# Altera a polite de leitura de arquivo
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser


# Criando novo projeto
ng new memoteca


# executando projeto
E preciso está na pasta do projeto.
ng serve


# Criando novo componente
ng generate component camponentes/cabecalho
ou
ng g c componentes/rodape


# Instalando json serve, essa ferramenta e utilizada para simular o backend
npm i json-server@0.17.4


    # para criar o arquivo json deve ser criado dentro da pasta nesse projeto foi criada a pasta backend
    npm init -y
    # deve ser alterado variavel test
      "test": "echo \"Error: no test specified\" && exit 1"
    #para
        #deve ser criado um novo arquivo .json passando o json que deseja ser enviado pelo json-server  
    "start": "json-server --watch db.json --port 3000" 
    
    #para executar deve ser utilizado o comando 
    npm start

    #para verificar e só acessar
    http://localhost:3000/


# Criar serviço no angula por linha de comando
ng g s componentes/pensamentos/pensamento



# Sobre o serviço
Ao fazer requisições o HttpClient retorna observable da chamada desses métodos. 
O Observable é utilizado internamente pelo framework e já é instalado quando você 
cria uma nova aplicação Angular e é uma funcionalidade da biblioteca RXJS. 
(pensamento.service.ts)


# Para realizar as navegações entre as telas e preciso configurar as rotas
no arquivo app-PerformanceResourceTiming.modele.ts as rotas são criadas, inclusive a rota defeaul, ela implemnta o path vazio.

# O angular e baseado em compentização, e tudo fica muito bem definido os arquivos de app.component... dever ser extremamente inxutos. 
# Com isso, todas as implementações dever ser criadas os componente especificos como mostra na aplica na pasta de componentes está mantido 
# todos os componentes da aplicação. 
