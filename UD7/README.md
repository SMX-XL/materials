# UD7. Capa Internet: Adreces IP i protocols d'encaminament

Com s'ha dit abans, la funció d'aquesta capa és la de transmetre paquets de dades entre dispositius que poden estar en xarxes diferents, aquesta capa és gestionada bàsicament per tres protocols:

- Protocol IP (Internet Protocol) que és el protocol principal d’aquesta capa, s’encarrega de l’adreçament i encaminament dels paquets de dades.

- Protocol ICMP (Internet Control Message Protocol) que s’encarrega de la gestió d’errors i control de la xarxa.

- Protocol ARP (Address Resolution Protocol) que s’encarrega de traduir les adreces IP en adreces MAC, actuant com a interfície amb la capa d'accés a la xarxa.

La unitat d'informació d'aquesta capa (PDU) és el **datagrama**, que és un paquet de dades que conté una capçalera amb informació de control i una càrrega útil amb les dades que es volen transmetre. La capçalera del datagrama IP conté informació com l'adreça IP d'origen i destinació, el tipus de protocol de la capa superior, la longitud del datagrama, etc.

Les característiques principals de la transmissió de dades en aquesta capa són:

- **Sense connexió**: Abans d'enviar un datagrama, no es comprova si el dispositiu de destinació està disponible o no. Simplement s'envia el datagrama i es confia que arribarà a la seva destinació.

- **No fiable**: No hi ha cap mecanisme de control d'errors ni de confirmació de recepció. Si un datagrama es perd o es corromp, qui ho envia no en té constància.

- **Sense estat**: No es manté cap informació sobre l'estat de la connexió entre els dispositius. Cada datagrama és independent dels altres i, per tant, el seu enviament es tracta de forma individual.

> 💡Les comunicacions clàssiques com el telèfon, el teletip, etc. calculen la ruta a l'inici de la transmissió i la mantenen per a tots els "paquets" enviats. És un sistema ràpid i eficient, però té un problema: si les condicions canvien (el camí es talla), es perd la transmissió. El protocol IP es va crear sense estat perquè un dels criteris de disseny d'ARPANET era que fos una xarxa capaç de mantenir les comunicacions encara que es produïssin fallades en alguns dels seus nodes.

Ara veurem alguns dels aspectes més importants d'aquesta capa com:

- Adreçament IP.
- Adreces reservades.
- Classless Inter-Domain Routing (CIDR). Màscares de subxarxa.
- ARP (Address Resolution Protocol).
- IP Routing.
- Adreces públiques i privades. NAT (Network Address Translation).
- Adreces IPv6

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

## Classless Inter-Domain Routing (CIDR)

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
