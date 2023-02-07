<h1>Dashboard Api</h1>
<p>Projeto freelance do qual desenvolvi um dashboard para gerenciamento de clientes e arquitetos.</p>

<h2>Principais dependências da aplicação:</h2>
<ul>
<li>GraphQL</li>
<li>Class-validator</li>
<li>BcryptJs</li>
<li>Jsonwebtoken</li>
<li>Mongoose</li>
<li>Jest</li>
</ul>
<h2>Entidades</h2>
<h3>Clients<h3>

```javascript
_id: string;
name: string;
email: string;
address: string;
number: string;
instagram: string;
indication: string;
aquisitions: string;
observations: string;
```

<h3>Account<h3>

```javascript
_id: string;
username: string;
password: string;
```

<h3>Architect<h3>

```javascript
_id: string;
name: string;
email: string;
address: string;
number: string;
instagram: string;
observations: string;
sample: string;
catalog: string;
bankInfo: string;
```

<h2>Queries</h2>
<h3>Account</h3>
<h4>Login. Se as credenciais estiverem corretas, um cookie http-only será criado para armazenar um token JWT no navegador do usuário.</h4>

```javascript
mutation LOGIN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password })
  }
```

<h3>Client</h3>
<h5>⚠️ Todas as queries para Client necessitam autenticação.</h5>
<h4>Listar clientes</h4>

```javascript
query GET_CLIENTS{
  getClients{
        email,name,instagram,number,address,observations,aquisitions,indication,_id
  }
}
```

<h4>Criar cliente</h4>

```javascript
mutation CREATE_CLIENT($name:String!,$email:String!,$instagram:String!, $observations:String!,$aquisitions:String!,$indication:String!,$address:String!,$number:String!,){
  createClient(data: { name: $name
      email: $email
      instagram: $instagram
      observations: $observations
      aquisitions: $aquisitions
      indication: $indication
      address: $address
      number: $number}) {
        email,name,instagram,number,address,observations,aquisitions,indication
  }
}
```

<h4>Atualizar cliente</h4>

```javascript
mutation UPDATE_CLIENT($id:String!,$name:String!,$email:String!,$instagram:String!, $observations:String!,$aquisitions:String!,$indication:String!,$address:String!,$number:String!){
 updateClient(data: {
     _id:$id,
      name: $name
      email: $email
      instagram: $instagram
      observations: $observations
      aquisitions: $aquisitions
      indication: $indication
      address: $address
      number: $number


 }) {
    email,name,instagram,number,address,observations,aquisitions,indication
 }
}

```

<h4>Deletar cliente</h4>

```javascript
mutation DELETE_CLIENT($id:String!){
  deleteClient(data: {_id:$id})
}

```

<h3>Arquitetos</h3>
<h5>⚠️ Todas as queries para Architect necessitam autenticação.</h5>
<h5>Listar arquitetos</h5>

```javascript
query GET_ARCHITECTS {
  getArchitects {
    _id,address,bankInfo,catalog,email,instagram,name,number,observations,sampleDate
  }
}

```

<h5>Criar arquiteto</h5>

```javascript
mutation CREATE_ARCHITECT( $address:String!,$bankInfo:String!, $catalog:String!,$email:String!,$instagram:String!, $name:String,$number:String!,$observations:String!, $sample:String!){
  createArchitect(data: {
    name:$name,
    bankInfo:$bankInfo,
    catalog:$catalog,
    email:$email,
    instagram:$instagram,
    number:$number,
    observations:$observations,
    sampleDate:$sample
    address:$address


  }) {
        _id,address,bankInfo,catalog,email,instagram,name,number,observations,sampleDate

  }
}

```

<h5>Atualizar arquiteto</h5>

```javascript
mutation UPDATE_ARCHITECT($id:String!,$address:String!,$bankInfo:String!, $catalog:String!,$email:String!,$instagram:String!, $name:String,$number:String!,$observations:String!, $sample:String) {
  updateArchitect(data: {
    _id:$id,
    name:$name,
    bankInfo:$bankInfo,
    catalog:$catalog,
    email:$email,
    instagram:$instagram,
    number:$number,
    observations:$observations,
    sampleDate:$sample
    address:$address


  }) {
            _id,address,bankInfo,catalog,email,instagram,name,number,observations,sampleDate
  }
}

```

<h5>Delete arquiteto</h5>

```javascript
mutation DELETE_ARCHITECT($id:String!){
  deleteArchitect(data:{_id:$id})
}
```
