# UD7. Capa Internet: Adreces IP i protocols d'encaminament

A la unitat anterior, ja es va indicar que la funció d'aquesta capa és la de transmetre paquets de dades entre dispositius que poden estar en xarxes diferents, aquesta capa és gestionada bàsicament per tres protocols:

- Protocol IP (Internet Protocol) que és el protocol principal d’aquesta capa, s’encarrega de l’adreçament i encaminament dels paquets de dades.

- Protocol ICMP (Internet Control Message Protocol) que s’encarrega de la gestió d’errors i control de la xarxa. El famós programa ping utilitza aquest protocol per comprovar la connectivitat entre dos dispositius.

- Protocol ARP (Address Resolution Protocol) que s’encarrega de traduir les adreces IP en adreces MAC, actuant com a interfície amb la capa d'accés a la xarxa.

La unitat d'informació d'aquesta capa (PDU) és el **datagrama**, que és un paquet de dades que conté una capçalera amb informació de control i una càrrega útil amb les dades que es volen transmetre. La capçalera del datagrama IP conté informació com l'adreça IP d'origen i destinació, el tipus de protocol de la capa superior, la longitud del datagrama, etc.

Les característiques principals del protocol IP són:

- **Sense connexió**: Abans d'enviar un datagrama, no es comprova si el dispositiu de destinació està disponible o no. Simplement s'envia el datagrama i es confia que arribarà a la seva destinació i cas que sigui necessari, és la capa de transport qui s'encarrega de garantir la fiabilitat de la transmissió.

- **No fiable**: No hi ha cap mecanisme de control d'errors ni de confirmació de recepció. Si un datagrama es perd o es corromp, qui ho envia no en té constància.

- **Sense estat**: No es manté cap informació sobre l'estat de la connexió entre els dispositius. Cada datagrama és independent dels altres i, per tant, el seu enviament es tracta de forma individual.

> 💡Les comunicacions clàssiques com el telèfon, el teletip, etc. calculen la ruta a l'inici de la transmissió i la mantenen per a tots els "paquets" enviats. És un sistema ràpid i eficient, però té un problema: si les condicions canvien (el camí es talla), es perd la transmissió. El protocol IP es va crear sense estat perquè un dels criteris de disseny d'ARPANET era que fos una xarxa capaç de mantenir les comunicacions encara que es produïssin fallades en alguns dels seus nodes.

Ara veurem alguns dels aspectes més importants d'aquesta capa com:

- Adreçament IP.
- Adreces reservades.
- Màscares de subxarxa.
- Subxarxes.
- Encaminament IP.
- Adreces públiques i privades. NAT (Network Address Translation).
- Adreces IPv6
- ARP (Address Resolution Protocol).

## Adreçament IP

A la capa d'accés a la xarxa, els dispositius s'identifiquen mitjançant l'adreça MAC, que és un identificador únic i que depèn del fabricant de l'adaptador de xarxa.

A la capa d'Internet, cal comunicar xarxes diferents i per tant, l'adreça MAC no és viable, perquè hauríem de tenir localitzades totes les adreces connectades al món, per aquest motiu, necessitem un format d'adreça que permeti agrupar jeràrquicament els dispositius per xarxes, de forma similar a com es fa amb els números de telèfon, aquestes són les **adreces IP**.

>💡 Us heu plantejat mai quin format té un número de telèfon fix? Per exemple, pensem un telèfon de Mataró, 34937556159. Aquest número, es pot descomposar en els 2 primers dígits (34) que identifiquen el país, el 93 correspon a la província, els 75 correspon a la zona o central telefònica, en aquest cas correspon a una de Mataró, sent la resta de dígits els que identifiquen la línia de l'abonat.

D'adreces IP actualment n'hi ha dues versions, que corresponen a les dues versions operatives del protocol IP, la versió 4 (IPv4) corresponent a la primera versió funcional d'ARPANET i la versió 6 (IPv6), que va néixer per solucionar el problema d'esgotament d'adreces IP de la versió 4.

La versió 4 del protocol IP utilitza adreces de 32 bits (en aquell moment era el límit de representació de dades que es podia utilitzar), d'aquesta manera es poden representar 2^32 adreces diferents, que són 4.294.967.296 adreces, que tot i que semblen moltes, ja fa anys que n'hi ha problemes d'esgotament.

Es representen en format decimal amb 4 octets separats per punts, per exemple:

`192.168.1.3`

Al principi, les adreces IP es van classificar en classes, que permetien identificar la mida de la xarxa i per tant, la quantitat d'equips que es podien connectar a la xarxa. Aquestes classes eren:

- **Classe A**: corresponent a xarxes de mida gran, ja que el primer byte identifica a la xarxa i els tres bytes restants identifiquen als hosts. Les xarxes de classe A, tenen el bit més alt de l'adreça a 0, per tant, el primer byte pot anar de 0 a 127.
- **Classe B**: adreces IP amb el primer byte començant amb 10, per tant, el primer byte pot anar de 128 a 191. Aquestes adreces són per a xarxes de mida mitjana, ja que els dos primers bytes identifiquen la xarxa i els dos bytes restants identifiquen als hosts.
- **Classe C**: adreces IP amb el primer byte comença per 110, de manera que el primer byte pot anar de 192 a 223. Aquestes adreces són per a xarxes petites, ja que els tres primers bytes identifiquen la xarxa i l'últim byte identifica als hosts.

Visualment, les classes es poden representar així:

```text
Classe A: 0xxxxxxx.Host.Host.Host
Classe B: 10xxxxxx.Xarxa.Host.Host
Classe C: 110xxxxx.Xarxa.Xarxa.Host
```

> 💡 Aquest model de classes es va crear perquè els equips de l'època (routers) tenien una capacitat limitada i identificar la mida de la xarxa mirant l'inici de l'adreça era computacionalment molt senzill.

A més, es van definir dues classes més, que no s'usen com a xarxes normals:

- **Classe D**: adreces IP amb el primer byte entre 224 i 239, utilitzades per a comunicacions **multicast**. Per exemple, els ordinadors Windows a més de tenir una adreça IP individual, usen una adreça IP de multicast compartida entre tots els ordinadors de la xarxa, per a enviar missatges a tots simultàniament. S'usen adreces sense agrupar-se en forma de xarxes.
- **Classe E**: adreces IP amb el primer byte entre 240 i 255. Aquestes adreces es van reservar per a ús experimental i per tant, no estan destinades a Internet públic.

Com s'ha dit abans, les adreces IP estan pensades per agrupar jeràrquicament els equips en xarxes, per tant, l'adreça indica a quina xarxa pertany l'equip i quin equip en concret és.

## Adreces reservades

No totes les adreces IP són vàlides per a ser assignades a equips, hi ha un conjunt d'adreces reservades per a usos especials, com ara:

- `0.0.0.0`: s'utilitza per indicar que l'equip no té adreça IP assignada.

- `127.x.x.x`: adreces de bucle invertit (loopback), s'utilitzen per a que un equip pugui comunicar-se amb si mateix. L'adreça més coneguda és `127.0.0.1`, però realment totes les adreces que comencen per 127 estan reservades per a aquest ús. Això és útil per la comunicació entre processos dins d'un mateix equip, ja que permet que un programa pugui enviar missatges a un altre programa que s'estigui executant en el mateix equip.

- `255.255.255.255`: adreça de difusió (broadcast), s'utilitza per enviar missatges a tots els equips de la xarxa local on està connectat l'equip que envia el missatge.

- Qualsevol adreça corresponent a una xarxa i que tingui tots els bits de host a 0, no es pot usar per identificar un equip, ja que identifica la xarxa.

- Qualsevol adreça corresponent a una xarxa i que tingui tots els bits de host a 1, no es pot usar per identificar un equip, ja que identifica la difusió (broadcast) a tots els equips d'aquella xarxa.

Per tant, a qualsevol xarxa, la primera adreça i la darrera no es poden assignar a cap equip. Per aquest motiu a una xarxa de classe C, que té un byte per identificar els hosts, només es poden assignar 254 adreces a equips, ja que la primera i l'última adreça no es poden utilitzar.

En general, el nombre d'equips disponibles en una xarxa es calcula amb la fórmula:

$$\text{Nombre d'equips} = 2^n - 2,  \text{ on } n \text{ és el nombre de bits destinats als hosts}$$

## La màscara de subxarxa (Classless Inter-Domain Routing o CIDR)

Durant anys, les xarxes que s'usaven havien de ser d'una de les tres classes indicades A, B o C. Això feia que moltes adreces IP es desaprofitessin, ja que si una xarxa necessitava 300 equips, no podia utilitzar una xarxa de classe C (només permet 254 equips), i havia d'utilitzar una xarxa de classe B (que permet 65.534 equips), desaprofitant moltes adreces.

El CIDR va ser introduït per solucionar aquest problema, permetent assignar adreces IP de manera més eficient i flexible, sense necessitat de seguir les restriccions de les classes.

S'introdueix el concepte de **màscara de subxarxa**, que és un conjunt de bits que indica quina part de l'adreça IP correspon a la xarxa i quina part correspon als hosts. La màscara de subxarxa es representa en format CIDR, que consisteix en escriure l'adreça IP seguida d'una barra i el nombre de bits que corresponen a la xarxa.

Per exemple, l'adreça IP 192.168.1.3/24 representa una adreça IP amb una màscara de subxarxa de 24 bits, que significa que els primers 24 bits corresponen a la xarxa i els últims 8 bits corresponen als hosts.

Exemple ús de màscara de subxarxa:

Un equip té l’adreça `172.0.2.224` i màscara `255.255.255.0`.

Per obtenir l’adreça de xarxa, fem una operació AND (i lògica) entre l’adreça IP i la màscara de subxarxa, això a nivell binari es fa multiplicant bit a bit, de manera que si el bit de la màscara és 1, es manté el bit de l’adreça IP, i si és 0, el bit resultant serà 0.

```binary
Adreça IP: 10101100.00000000.00000010.11100000
Màscara:   11111111.11111111.11111111.00000000
Xarxa:     10101100.00000000.00000010.00000000
```

Per tant, l’adreça de xarxa és `172.0.2.0`.

Com serveix per separar la part de xarxa de la part d’host, els bits amb valor 1 **sempre estan a l'esquerra** i els bits amb valor 0 **sempre a la dreta**.

I com queden les classes? Realment, ja no existeixen, però per costum solen seguir utilitzant-se els termes classe A, B i C per referir-se a xarxes amb màscares de subxarxa de 8, 16 i 24 bits respectivament i que sovint els equips suggereixen com a **màscara per defecte** quan es configura una adreça IP. Per això, quan en un ordinador configureu la IP, us proposarà una màscara de subxarxa segons la classe de l'adreça IP que heu introduït, però la podreu modificar per adaptar-la a la configuració real.

Per tant, actualment una adreça IP **sempre** s'ha d'acompanyar d'una màscara de subxarxa, que pot ser qualsevol valor entre 0 i 32 bits, aquesta màscara es pot indicar en forma de 4 bytes o de forma compacta, indicant quants bits corresponen a la xarxa, que són els bits que tenen valor 1 a la màscara. Per exemple, una màscara de subxarxa de 24 bits es pot indicar com a `255.255.255.0` o bé com a `/24`.

Les màscares poden diferents valors en funció del nombre d'1s que tinguin (sempre a l'esquerra) i per tant, del nombre de bits destinats a la xarxa i als hosts. A continuació es mostren alguns exemples de màscares de subxarxa:

```text

- `0.0.0.0` o `/0`: tots els bits són 0, per tant, sempre donarà com a resultat 0 i s'usa per l'encaminament per defecte.

- `255.0.0.0` o `/8`: 8 bits per a la xarxa, 24 per als hosts, corresponent a l'antiga classe A.

- `255.255.0.0` o `/16`: 16 bits per a la xarxa, 16 per als hosts, corresponent a l'antiga classe B.

- `255.255.255.0` o `/24`: 24 bits per a la xarxa, 8 per als hosts, corresponent a l'antiga classe C.

- `255.255.255.128` o `/25`: 25 bits per a la xarxa, 7 per als hosts, indica una xarxa amb 128 adreces, de les quals 126 es poden assignar a equips.

- `255.255.255.255` o `/32`: tots els bits són 1, per tant, indicaria que tots els bits corresponen a la xarxa i cap als hosts, s'usa en encaminaments a un equip únic. 
```

I què permet l'ús de les màscares de subxarxa? Doncs permet fer agrupacions flexibles, per exemple dividir una xarxa en subxarxes més petites o agrupar xarxes amb un prefix comú, acció típica a l'hora de enviar paquets a través d'Internet.

## Subxarxes

Aquesta tècnica consisteix a dividir una xarxa en subxarxes més petites, per exemple, si tenim una xarxa amb màscara de subxarxa `/24`, que permet 254 equips, però una xarxa més petita, de 50 equips, podem dividir aquesta xarxa en 5 subxarxes amb màscara `/26`, que permeten 62 equips cadascuna.

Existeixen dues tècniques diferents de fer la divisió de subxarxes, en aquest curs usarem la més senzilla, que consisteix a dividir la xarxa en subxarxes de la mateixa mida, per exemple, si tenim una xarxa amb màscara `/24`, podem dividir-la en 2 subxarxes amb màscara `/25`, que permeten 126 equips cadascuna, o bé en 4 subxarxes amb màscara `/26`, que permeten 62 equips cadascuna.

### Procediment per calcular subxarxes

Partim de la xarxa original (adreça IP i màscara de subxarxa) i de la necessitat que es plantegi, que pot ser el nombre de subxarxes que es volen crear o el nombre d'equips que es volen connectar a cada subxarxa. Anem a veure un exemple de cada cas.

1. **Dividir en un nombre determinat de subxarxes**

    Si es demana dividir en `N` subxarxes, cal calcular quants bits cal "agafar" de la part d'host per a crear les subxarxes. Per això, cal buscar el nombre més petit `n` tal que `2^n >= N`. A continuació, es sumen aquests `n` bits a la màscara de subxarxa original per obtenir la nova màscara de subxarxa.

    Per exemple, si es demanen 4 subxarxes, necessitem 2 bits, ja que `2^2 = 4`, si es demana dividir en 6 subxarxes, necessitem 3 bits, ja que `2^3 = 8`, que és el nombre més petit de subxarxes que podem crear amb 3 bits.

    > 💡 Com segur que heu notat, sempre dividirem amb una nombre potència de 2 (4,8, 16 ...) subxarxes. És la limitació del mètode de divisió amb màscara única.

    Exemple: Tenim una xarxa amb adreça `192.168.1.0` i màscara `/24`. Volem dividir-la en 3 subxarxes.

    Solució:

    Haurem de dividir en **4** subxarxes perquè és la potència de 2 més propera a 3 per excès, per tant, necessitem 2 bits per a les subxarxes.

    - Nova màscara de subxarxa: `/24 + 2 = /26`
    - Nombre d'equips per subxarxa: `2^(32-26) - 2 = 62 equips`

    - 1a subxarxa: `192.168.1.0/26` , equips de `192.168.1.1` a `192.168.1.62` i broadcast `192.168.1.63`.

    - 2a subxarxa: `192.168.1.64/26` , equips de `192.168.1.65` a `192.168.1.126` i broadcast `192.168.1.127`.

    - 3a subxarxa: `192.168.1.128/26` , equips de `192.168.1.129` a `192.168.1.190` i broadcast `192.168.1.191`.

    Quedant la 4a subxarxa sense utilitzar.

2. **Dividir en subxarxes amb un nombre determinat d'equips**

    En aquest cas, cal calcular quants bits cal "agafar" de la part d'host per a crear les subxarxes. Per això, cal buscar el nombre més petit `n` tal que `2^n - 2 >= M`, on `M` és el nombre d'equips que es volen connectar a cada subxarxa. A continuació, es sumen aquests `n` bits a la màscara de subxarxa original per obtenir la nova màscara de subxarxa.

    Per exemple, si ens deman connectar 50 equips a cada subxarxa, necessitem 6 bits, ja que `2^6 - 2 = 62`, ja que és la xarxa més petita que es pot crear i on càpiguen 50 equips.

    Exemple: Tenim una xarxa amb adreça `172.16.0.0` i màscara `/16`. Volem dividir-la en subxarxes el més petites possibles amb 80 equips cadascuna.

    Solució:

    Per tenir 80 equips, necessitem 7 bits, ja que `2^7 - 2 = 126`, que és el nombre més petit de bits que ens permet tenir almenys 80 equips.

    Per tant, les noves subxarxes tenen prou amb un màscara de `32-7 = /25`, com originalment teníem un màscara de `/16`, vol dir que dividirem la xarxa original en `2^25 = 128` subxarxes.

    A continuació, es mostren les primeres subxarxes:

    - 1a subxarxa: `172.16.0.0/25` , equips de `172.16.0.1` a `172.16.0.126` i broadcast `172.16.0.127`.
    - 2a subxarxa: `172.16.0.128/25` , equips de `172.16.0.129` a `172.16.0.254` i broadcast `172.16.0.255`.
    - 3a subxarxa: `172.16.1.0/25` , equips de `172.16.1.1` a `172.16.1.126` i broadcast `172.16.1.127`.

## Encaminament IP

Recordem que la funció de la capa Internet és transmetre paquets de dades entre dispositius que poden estar en xarxes diferents, per això, cal que els dispositius coneguin quina és la millor ruta per enviar els paquets a la seva destinació, aquest procediment s'anomena **encaminament IP** i es realitza mitjançant taules d'encaminament que contenen informació sobre les xarxes conegudes i la millor ruta per arribar-hi.

## Adreces públiques i privades. NAT (Network Address Translation)

A la xarxa telefònica, no podem tenir dos mòbils amb el mateix número, ja que no es podrien diferenciar, per això, cada mòbil té un número únic. A Internet passa el mateix, no es poden tenir dos equips amb la mateixa adreça IP pública a Internet, ja que no es podrien diferenciar. Per això, les adreces IP públiques són úniques a Internet i són assignades per l'ICANN (Internet Corporation for Assigned Names and Numbers).

Aconseguir una adreça IP a Internet està regulat, no podem triar la que nosaltres vulguem. L'ICANN és l'organització que s'encarrega de gestionar les adreces IP a nivell mundial, i per això, ha creat 5 organitzacions regionals (RIR) que s'encarreguen de gestionar les adreces IP a nivell regional i que es van repartir les adreces IP.

![Mapa organitzacions regionals](https://aso.icann.org/wp-content/uploads/2019/12/RIR-Map-Website.jpg)

> ❗ El repartiment no va ser equitatiu, ja que originalment, Internet es va crear als Estats Units i per això, es va quedar un bona part de les adreces. El creixement de Internet a la resta del món ha fet que actualment hi hagi problemes d'esgotament d'adreces IP públiques, especialment a Àfrica i Àsia on la població connectada a Internet ha crescut molt a les darreres dècades.

Un proveïdor d'Internet, aconsegueix un bloc d'adreces IP a canvi d'un quota anual i són aquestes adreces les que assigna al seus clients, repecurtint el cost dins la tarifa d'accés a Internet. Les adreces IP que s'usen a Internet, s'anomenen **adreces IP públiques** i recordem, són úniques a Internet, per tant, no es poden repetir.

Però penseu ara a l'escola, us imagineu que cadascun dels ordinadors que hi ha a l'escola hagués de pagar per tenir una adreça IP? En primer lloc, el cost per la major part de les empreses i particulars (quants equips tenen connexió a Internet a casa vostra?).

Per aquest motiu, es van crear les **adreces privades**, que són adreces que no són úniques a Internet i que poden ser utilitzades per qualsevol xarxa privada, com ara una escola, una empresa o una casa particular. Aquestes adreces IP privades no es poden utilitzar a Internet, ja que no són úniques i per tant, no hi poden accedir directament. El seu principal avantatge és que es poden reutilitzar en diferents xarxes privades, permetent així un estalvi d'adreces IP públiques.

I quines xarxes IP són privades? Doncs hi ha tres blocs d'adreces IP que estan reservades per a ús privat:

- `10.0.0.0/8`: és a dir, es va reservar tota una xarxa de classe A.
- `172.0.16.0/12`: és a dir, es van reservar 16 xarxes de classe B.
- `192.168.0.0/16`: per tant, l'equivalent a 256 xarxes de classe C.

Per tant, a casa, a l'escola o a l'empresa, els nostres equips usaran una adreça IP privada, la podeu consultar mirant la configuració de xarxa del vostre ordinador.

La pregunta ara és, i com podem accedir a Internet si tenim una adreça IP privada? Doncs per això es va crear el protocol NAT (Network Address Translation), que permet que els equips amb adreces IP privades puguin accedir a Internet utilitzant una adreça IP pública, que és la que s'utilitza per identificar la xarxa privada a Internet.

El router d'accés a Internet, que és l'encarregat de connectar la xarxa privada amb Internet, fa la traducció d'adreces IP privades a adreces IP públiques i viceversa, de manera que els equips de la xarxa privada poden accedir a Internet sense problemes.

Per això tots els equips d'una xarxa són visibles a Internet amb la mateixa adreça IP pública, que és la que té el router d'accés a Internet, ho podeu comprovar per exemple, accedint a la web [https://www.whatismyip.com/](https://www.whatismyip.com/) i comprovant que tota la classe obté el mateix resultat.

## Adreces IPv6

Amb el creixement d'Internet, el nombre d'adreces IP públiques disponibles s'ha anat esgotant, per això, es va veure la necessitat de crear un nou protocol IP que permetés un nombre molt més gran d'adreces IP públiques. Finalment, el protocol triat va ser l'IPv6, que tot i que es va definir a l'any 1998, no es va aprovar com estàndard definitiu fins a l'any 2017.

Aquesta nova versió del protocol IP utilitza adreces de 128 bits, que permeten un nombre molt gran d'adreces IP públiques, concretament 2^128 adreces, que són 340.282.366.920.938.463.463.374.607.431.768.211.456 adreces, que és un nombre molt gran d'adreces IP.

Perquè us feu una idea, suposant una població mundial de 8.000 milions d'habitants, amb IPv4, tocaríem a 0,5 adreces IP per persona. De fet serien menys, per causa de les adreces reservades, les privades i l'espai no usable (classes D i E). Amb IPv6, tocarien un nombre d'adreces per persona de l'ordre de milers de trillons.

I com es representen les adreces IPv6? Doncs en format hexadecimal, amb 8 grups de 4 dígits hexadecimals separats per dos punts, per exemple:

`2001:0db8:85a3:0000:0000:8a2e:0370:7334`

I la màscara de subxarxa es representa amb una barra i el nombre de bits que corresponen a la xarxa, per exemple:

`2001:0db8:85a3:0000:0000:8a2e:0370:7334/64`

Com podeu veure, les adreces IPv6 són molt més llargues que les adreces IPv4, per això, s'han definit unes regles per a simplificar la seva representació:

- Els zeros a l'inici d'un grup de 4 dígits hexadecimals es poden eliminar, per exemple, el grup `0db8` es pot escriure com `db8`.
- Els grups de zeros consecutius es poden substituir per `::`, però només es pot fer una vegada en tota l'adreça, per exemple, l'adreça `2001:0db8:0000:0000:0000:0000:0000:0001` es pot escriure com `2001:db8::1`. Òbviament, si hi ha més d'un grup de zeros consecutius, només es pot substituir un d'ells per `::`, per exemple, l'adreça `2001:0db8:0000:0100:0000:0000:0000:0001` es pot escriure com `2001:db8::1`, però no es pot escriure com `2001::100::1`, perquè no se sabria quins grups de zeros s'han substituït.

Els valors de la màscara de subxarxa, a diferència de IPv4 són molt més limitats, `/64`és la màscara més utilitzada, ja que s'ha definit com la màscara per defecte estàndard per xarxes finals. Per les xarxes del operadors d'Internet, s'utilitzen màscares de `/48`, que permeten crear subxarxes amb màscara `/64`.

I quins tipus d'adreces IPv6 hi ha? Doncs hi ha tres tipus d'adreces IPv6:

- **Unicast**: adreces que identifiquen un únic dispositiu a la xarxa. Són les adreces més utilitzades i permeten enviar paquets de dades a un únic dispositiu.
- **Multicast**: adreces que identifiquen un grup de dispositius a la xarxa. Permeten enviar paquets de dades a tots els dispositius del grup.
- **Anycast**: adreces que identifiquen un grup de dispositius a la xarxa, però només un d'ells respon al paquet de dades enviat. Permeten enviar paquets de dades al dispositiu més proper del grup.

Aquí no existeix l'equivalent a les adreces de difusió (broadcast) d'IPv4, ja que amb xarxes tan grans, suposaria un gran problema de congestió de la xarxa.

I pel que respecta a adreces públiques i privades?

Doncs, amb IPv6 es va definir un tipus d'adreces anomenades ULA (Unique Local Addresses),pensades per a utilitzar en xarxes locals, que equivalen a les adreces privades d'IPv4, s'usa el prefix `FD00::/8`.

A part d'això, s'han definit un tipus d'adreces IPv6 anomenades d'enllaç local (link-local), que són adreces que només són vàlides dins d'una xarxa local i no poden ser utilitzades a Internet. Aquestes adreces tenen el prefix `FE80::/10` i s'utilitzen per a la comunicació entre dispositius dins d'una mateixa xarxa local. Tenen la característica que es generen automàticament a partir de l'adreça MAC del dispositiu, per tant, són úniques dins la xarxa local i no cal configurar-les manualment, per això, són molt populars en aplicacions que usen IPv6 a nivell local.

I quina implantanció té IPv6 actualment?

Doncs encara és limitada, segons les estadístiques de [Google](https://www.google.com/intl/en/ipv6/statistics.html), un 50% dels usuaris de Google usen IPv6. Però la implantació és lenta i desigual. El nucli d'Internet ja fa anys que funciona amb IPv6, de la mateixa manera que les grans companyies com Google, Facebook, Microsoft, etc. Però la resta d'Internet, especialment les xarxes dels proveïdors d'Internet, encara funcionen majoritàriament amb IPv4.

Per països com Índia, França o Xina lideren amb implantacions que superen el 70%, Estats Units d'Amèrica té una quota d'implantació d'IPv6 superiors al 50%, mentre que països com Espanya, Itàlia o Alemanya tenen quotes inferiors al 20%, i en el cas d'Àfrica, els valors encara són més baixos, amb països com Nigèria o Sud-àfrica amb quotes inferiors al 10%.

A les xarxes locals, malgrat la majoria d'equips ja són compatibles amb IPv6, la majoria dels routers d'accés a Internet encara no ho són, per tant, es continua utilitzant IPv4.

## ARP (Address Resolution Protocol)

Estem parlant molt d'adreces IP i de l'important que són, però si fem una mica de mempòria, a la capa d'accés a la xarxa, els dispositius s'identifiquen mitjançant l'adreça MAC, que recordem és única i depèn del fabricant de l'adaptador de xarxa. 

Per tant, si un dispositiu vol enviar un paquet a través de la seva xarxa Ethernet o WiFi, ha de conèixer l'adreça MAC del dispositiu de destinació. Però com es fa això si només coneixem l'adreça IP del dispositiu de destinació? Doncs per això es va crear el protocol ARP (Address Resolution Protocol), que permet traduir una adreça IP en una adreça MAC.

I com funciona ARP? Doncs quan un dispositiu vol enviar un paquet a un altre dispositiu de la mateixa xarxa, envia un missatge ARP a tota la xarxa preguntant "Qui té aquesta adreça IP? Respon amb la teva adreça MAC". El dispositiu que té aquesta adreça IP respon amb la seva adreça MAC, i així el dispositiu emissor pot enviar el paquet directament al dispositiu de destinació.

Els equips per tant, tenen una taula ARP, que és una taula que conté les adreces IP i les adreces MAC corresponents dels dispositius de la xarxa. Aquesta taula es va omplint a mesura que els dispositius es comuniquen entre si, i permet enviar paquets directament als dispositius de destinació sense haver de preguntar cada vegada per la seva adreça MAC, la podeu consultar si obriu un terminal i escriviu la comanda `arp -a` a Windows o `arp -n` a Linux.

Aquesta taula no és permanent, ja que les adreces MAC poden canviar si un dispositiu es connecta a una altra xarxa, per això, les entrades de la taula ARP tenen un temps de vida limitat i s'eliminen automàticament després d'un temps.

```terminal
# Exemple de taula ARP a Windows
Interface 192.168.1.12
  Internet Address      Physical Address      Type
  192.168.1.1           00-1a-2b-3c-4d-5e     dynamic
  192.168.1.2           00-1a-2b-3c-4d-5f     dynamic
```
