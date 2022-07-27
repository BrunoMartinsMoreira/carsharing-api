# :car: Cadastro de veículo
###  :heavy_check_mark: RF

* Deve ser possível cadastrar um novo veículo
* Deve ser possível listar todas as categorias

### :heavy_exclamation_mark:RN

* Não deve ser possível cadastrar mais de um veículo com a mesma placa

* Não deve ser possível alterar a placa de um veículo já cadastrado

* O veículo deve ser cadastrado com disponibilidade por padrão

* Somente usuários com perfil administrador podem cadastrar veículos

* O veículo deve ter uma ou mais especificações vinculadas a ele

# :page_with_curl: Listagem de carros

###  :heavy_check_mark: RF

* Deve ser possível listar os veículos disponíveis

* Deve ser possível listar todos os veículos disponíveis pelo nome da categoria, pelo nome da marca ou pelo nome do veículo

### :heavy_exclamation_mark:RN

* Para fazer a listagem de veículos o usuário não precisa estar logado

# :clipboard: Cadastro de especificação de um veículo

###  :heavy_check_mark: RF
* Deve ser possível cadastrar uma especificação para um veículo

* Deve ser possível listar todas as especificações e veículos cadastrados

### :heavy_exclamation_mark:RN
* Não deve ser possível cadastrar uma especificação sem um veículo vinculado a ela

* Não dever ser possível cadastrar uma especificação já existente para o mesmo carro

* Somente usuários com perfil administrador podem listar e cadastrar especificações

# :floppy_disk: Cadastro de imagens do veículo

###  :heavy_check_mark: RF
* Deve ser possível cadastrar uma ou mais imagens para um veículo

### :heavy_exclamation_mark:RN
* Usuários com perfil administrador podem cadastrar uma ou mais imagens para um veículo

* Usuários com perfil administrador podem listar todos os veículos

# :calendar: Aluguel de veículo

###  :heavy_check_mark: RF
* Deve ser possível agendar uma locação de um veículo

### :heavy_exclamation_mark:RN

* A locação dever ter duração mínima de 24h

* Não deve ser possível cadastrar uma locação para o mesmo usuário ao mesmo tempo, ou seja, para cadastrar uma nova locação o usuário deve primeiro encerrar a atual

* Não deve ser possível cadastrar mais de uma locação para um veículo no mesmo horário