# Data i czas w JavaScript

(oryginalnie opublikowane na https://ohmydev.pl/post/data-i-czas-w-javascript-2g7f)

Hej!

Już niedługo zmiana czasu, dzięki której wrócimy do właściwego dla nas czasu podstawowego UTC+1. Niestety, jakkolwiek tego nie lubimy, zmiany czasu będą dalej co najmniej do 2026 roku. Jednak ta najbliższa, niedzielna zmiana to dobra okazja, by opowiedzieć sobie co nieco na temat obsługi dat w JavaScript.

## Date

Podstawa to oczywiście obiekt Date dostępny w standardzie ECMAScript w zasadzie od początku jego istnienia. Oferuje nam najbardziej podstawowe funkcjonalności związane z datami, jak:

- obsługę czasu w postaci zarówno UTC i Epoch
- pobranie aktualnej daty
- możliwość tworzenia dat od zera
0 wyświetlenie daty w lokalnym formacie.

Po szczegóły warto zajrzeć na MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date.

Zamiast opisywać dokładnie, co dokładnie można, wolę wypisać pułapki, na jakie musimy uważać:

- Miesiące są odliczane od zera, więc styczeń to 0, luty 1, marzec 2 itd.
- Czas Epoch to nie jest uniksowy Epoch, tylko ECMAScriptowy. Odliczanie jest od tej samej daty (01.01.1970), jednak odbywa się to w milisekundach. Dlatego, jeśli z backendu dostajemy czas w tej postaci, to najczęściej będziemy musieli przemnożyć przez 1000. W drugą stronę, wysyłając na backend, trzeba będzie podzielić przez 1000 z zaokrągleniem (`Math.floor`, nie round!)
- Odnośnie komunikacji z backendem — JSON nie wspiera zapisu dat. Dlatego, warto ustalić razem z backendowcami format zapisu. `JSON.stringify` domyślnie robi `toString()`, dzięki któremu otrzymujemy czas w formacie ISO8601, ale warto zadać pytanie, czy inny format nie będzie lepszy (tym samym trzeba będzie pisać mapper). Warto uważać szczególnie gdy współpracujemy z .NETowcami, bo nie wiem jak obecnie, ale kilka lat temu domyślny serializer zapisywał coś w stylu `Date(1635350060260)`, czego JS nie rozumie.
- Co do powyższego, format Epoch może nie być najlepszym wyborem. JSowy Epoch ignoruje sekundy przestępne, podczas gdy tradycyjny POSIXowy bierze je pod uwagę, stąd jest 27 sekund do przodu.

## Moment.js

[Moment.js](https://momentjs.com/) to najpopularniejsza JSowa biblioteka. Oferuje mnóstwo funkcji pozwalających na operacje na datach, parsowanie różnych formatów, ogólnie wszystko fajnie i pięknie, tylko że... jest już nierozwijana. Jeżeli stosujesz ją w projekcie, to spoko, aczkolwiek możesz pomyśleć nad przejściem na inną bibliotekę. Jeśli dopiero szukasz biblioteki do obsługi dat, nie wchodź w Moment.js.

A co Moment potrafi? Bardzo dużo. Poniżej kilka krótkich snippetów pokazujące garść przydatnych funkcji:

```javascript
moment([2007, 0, 29]).fromNow() // 15 years ago

moment.locale('pl')
moment([2007, 0, 29]).fromNow() // 15 lat temu

moment('2013-01-01T00:00:00.000').quarter() // 1

moment().startOf('year') // Moment<2021-01-01T00:00:00+00:00>

moment().isLeapYear() // false (w 2021)

moment('2010-10-20').isBetween('2010-10-19', '2010-10-25') // true
```

Powyższe funkcje możesz przetestować tutaj: https://replit.com/@tswistak/Moment#index.js

## Day.js

[Day.js](https://day.js.org/) to nowoczesna, lekka biblioteka do obsługi dat, która ma prosty cel — być łatwą w użyciu alternatywą dla Moment.js. Ma nawet niemal identyczne API, dlatego przenoszenie projektów korzystających z Moment na Day jest bardzo szybkie. Wystarczy podmienić import z moment na dayjs i w zasadzie tyle. Różnice są bardzo drobne i tylko raz zdarzyło mi się robić jakieś zmiany względem Momenta. Z tego też powodu nie powielę przykładu — wszystko wygląda dokładnie tak samo.

## date-fns

[date-fns](https://date-fns.org/) to obecnie moja ulubiona biblioteka do obsługi dat w JavaScript. Funkcjonalnie podobna do Moment.js i co istotne, dobrze się treeshakuje. Też fajną cechą jest to, że biblioteka oprócz zwykłego wariantu, zawiera też wariant FP dla tych, co lubią programowanie funkcyjne. W wariancie tym wszystkie funkcje mamy w postaci rozwiniętej (currying), tym samym możemy bez problemu używać ich w Lodashowym flow, czy Ramdowym pipe. Dodatkowo co warto zauważyć to fakt, że zarówno Moment jak i Day posiadają własny obiekt daty; date-fns natomiast nie stosuje nic takiego, wszystko wciąż się opiera o zwykły Javascriptowy `Date`. Dostajemy jedynie dodatkowe funkcje do jego obsługi.

Poniżej możesz zobaczyć te same rzeczy, które robiliśmy z Momentem, ale z wykorzystaniem date-fns:

```javascript
formatDistanceToNowStrict(new Date(2007, 0, 29), { addSuffix: true }) // 15 years ago

formatDistanceToNowStrict(new Date(2007, 0, 29), { addSuffix: true, locale: require('date-fns/locale/pl') }) // 15 lat temu

getQuarter(new Date('2013-01-01T00:00:00.000')) // 1

startOfYear(new Date()) // 2021-01-01T00:00:00.000Z

isLeapYear(new Date()) // false (w 2021)

const date = new Date(2010, 10, 20)
isAfter(date, new Date(2010, 10, 19)) && isBefore(date, new Date(2010, 10, 25)) // true
```

Powyższe funkcje możesz przetestować tutaj: https://replit.com/@tswistak/Datefns#index.js

## Temporal

Bibliotek do obsługi dat jest oczywiście więcej, ale zamiast omawiać kolejne, warto spojrzeć na to, co możemy niedługo dostać w standardzie ECMAScript. Otóż w standardzie mamy proposal (aktualnie w stage 3) obiektu [`Temporal`](https://tc39.es/proposal-temporal/docs/index.html), który będzie posiadać bardziej rozbudowaną obsługę dat. Co znajdziemy w propozycji? Wsparcie dla wszystkich stref czasowych, lepsze parsowanie stringów z datami, a także wsparcie innych kalendarzy niż gregoriański. Dla chętnych zobaczyć próbkę możliwości polecam tą stronę: https://tc39.es/proposal-temporal/docs/cookbook.html. Możliwe, że kiedyś doczekamy się tego w standardzie, na razie możemy jedynie popatrzeć. Co prawda, istnieje polyfill, ale służy on tylko do testów, nie do zastosowania produkcyjnego.

## Coś więcej?

Jeżeli interesuje Cię temat obsługi dat, to gorąco zachęcam do zajrzenia na mojego bloga, gdzie miałem okazję napisać kilka artykułów poświęconych temacie dat:

- Jak komputer mierzy czas?
- Jak komputer przechowuje datę i skąd zna aktualną?
- Dlaczego mierzenie i przetwarzanie czasu jest trudne? - część 1
- Dlaczego mierzenie i przetwarzanie czasu jest trudne? - część 2
- Określanie dnia tygodnia dla dowolnej daty

Myślę, że po przeczytaniu tych artykułów zrozumiesz, że jest to temat trudny i że nie ma co pisać rozwiązań na własną rękę, tylko korzystać z gotowych i sprawdzonych. A te gotowe wyżej wymienione, są moim zdaniem najlepsze, gdy mówimy o świecie JavaScriptu, niezależnie co w nim programujemy.
