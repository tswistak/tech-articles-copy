# Top 5 najczęstszych błędów w projektach JSowych

(oryginalnie opublikowane na https://ohmydev.pl/post/top-5-najczestszych-bledow-w-projektach-jsowych-22b1)

Hej!

Pomyślałem, że dziś podzielę się mocno subiektywnym top 5 najczęściej widzianych przeze mnie błędów w projektach JSowych, które miałem okazję sprawdzać. Post wrzucam w społeczność frontend, ale rzeczy te też spotykam na backendzie JSowym. Zresztą, rady te po odpowiedniej modyfikacji będą pasować pod wiele innych języków programowania.

Zaczynajmy.

## 1) Wrzucanie sekretów do repozytorium

Jednym z najczęściej widywanych przeze mnie błędów jest wrzucanie wszelkiego typu niepublicznych informacji w repozytorium Gitowe. Pół biedy, jeśli repozytorium jest niepubliczne, jednak na publicznym jest to proszenie się o problemy.

### Dlaczego?

Takie rzeczy, jak przede wszystkim access tokeny do API powinniśmy traktować na równi z hasłem. Raczej nie chcemy, żeby ktoś niepowołany mógł robić na API rzeczy w naszym imieniu. Szczególnie jeśli jest to np. baza naszej aplikacji na Firebase. Do tego, niektóre tokeny mogą dać za dużą władzę, np. na AWS jesteśmy w stanie wygenerować token, z którym mamy dostęp administratora do wszystkich usług w naszej chmurze. Chyba nie muszę dodawać, że to mogłoby wygenerować kłopoty, jeśli dostanie się w niepowołane ręce?

### Jak zapobiec?

Najprostszy sposób to korzystanie ze zmiennych środowiskowych. Definiujemy plik .env, w którym trzymamy tajne wartości, dodajemy go do .gitignore, a następnie odwołujemy się do wartości przez `process.env.[nazwa zmiennej]`.

Aby odczytać zmienne środowiskowe z pliku, możemy:

- na frontendzie wykorzystać w Webpacku DotenvPlugin, który nam doczyta zmienne z pliku .env do obiektu process.env
- na backedzie skorzystać z biblioteki dotenv, która zaczytuje zawartość pliku .env do `process.env` po wywołaniu `dotenv.config()`
- jeśli projekt postawiliśmy z dowolnego generatora projektów (np. Create React App, Nx) to one zwykle posiadają wbudowaną obsługę plików .env. Warto tylko zwrócić uwagę, że np. w CRA plik .env jest commitowany do repozytorium, a niecommitowany nazywa się .env.local. Do tego, w przypadku CRA mamy narzucony schemat nazywania zmiennych.

## 2) Korzystanie z npm/yarn install przy buildach produkcyjnych

Pamiętacie niedawną aferę z colors.js, gdzie twórca wypuścił celowo uszkodzoną wersję biblioteki? Albo niezliczone już afery, kiedy znaleziono złośliwe oprogramowanie w NPM? Cóż, problem ten może nas dotknąć, ale możemy minimalizować ryzyko. Przede wszystkim, sami możemy w package.json ustawiać konkretne wersje paczek bez wildcardów, jednak nawet to nas nie chroni w 100%, bo zewnętrzne zależności często te wildcardy już mają.

Co więc możemy robić więcej? Polegać na package lockach. Zarówno NPM, jak i Yarn generują plik lock, który zawiera informacje o tym, jakie wersje bibliotek zostały ściągnięte przy dodawaniu paczki do projektu. Dzięki temu powinniśmy mieć pewność, że instalujemy zawsze sprawdzoną wersję biblioteki. Jednak pojawia się problem — ani npm install, ani yarn install tego nie przestrzegają. Jak więc to wymusić?

Bardzo łatwo:

- W NPM: `npm ci`
- W Yarn: `yarn install --frozen-lockfile`

I jest to sposób, który powinniśmy zawsze używać przy buildach produkcyjnych

## 3) [Docker] Zła kolejność wykonywania operacji w Dockerfile aplikacji JSowych

Jest to nieco bardziej już temat DevOpsowy, jednak myślę, że warto wspomnieć, bo tyczy się jednak projektów JSowych. Jeżeli w swoim projekcie stosujesz Dockera (za co zawsze duży plus przy rekrutacji), to należy wiedzieć nieco o tym, jak powinno się unikać błędów w Dockerfile'ach. Mianowicie, dość często spotykanym błędem jest stosowanie czegoś na poniższy wzór:

```dockerfile
COPY . .
RUN npm ci
RUN npm run build
```

Dlaczego? Otóż w ten sposób, niezależnie od zmiany:

- Będziemy zawsze na nowo ściągać paczki z NPM, co zwykle jest długotrwałe — Docker posiada cache, który może pozwolić nam na ominięcie tego kroku.
- Kontenery składają się z warstw (każda linijka w Dockerfile, z małymi wyjątkami, to nowa warstwa) i jeśli kilka kontenerów o różnych tagach ma identyczne warstwy, nie są one powielane na Hubie, tylko wykorzystywane ponownie. Dzięki temu oszczędzamy miejsce.
- Kontynuując powyższy punkt — jeżeli jakąś warstwę posiadamy już na dysku, to nie jest ona ściągana na nowo, więc też mniej czasu zajmuje docker pull.

A jak to rozwiązać? Najpierw przekopiować package.json oraz locka (nie potrzebujemy reszty projektu, aby ściągnąć zależności!), a dopiero później resztę kodu. Przykładowy dockerfile mógłby wtedy wyglądać tak:

```dockerfile
COPY package.json .
COPY package-lock.json .
npm ci
COPY . .
npm run build
```

Dzięki temu, jeśli nic nie zmienialiśmy w package.jsonie, build naszego kontenera będzie znacznie szybszy, jak i też jego późniejsze ściągnięcie. Do tego, oszczędzimy miejsce na Hubie.

## 4) Brak stosowania ESLint / Prettiera / editorconfig itp.

Jedną z rzeczy, które odrzucają mnie od repozytoriów przy sprawdzaniu kodu pod kątem rekrutacji, są repozytoria z niezachowaną konsekwencją w kwestii formatowania. Podpięcie któregokolwiek z narzędzi, które wymieniłem w nagłówku, trwa chwilę, a dzięki nim zachowamy spójność stylu kodu. Co nieco więcej o nich:

- Editorconfig oferuje najmniej, jednak oferuje całkowite podstawy, jak np. wielkość odstępów czy rodzaj zakończeń linii. Do tego, można zastosować go do dowolnego formatu pliku, więc jest narzędziem uniwersalnym. Integruje się z edytorem kodu, aby automatycznie stosować wytyczne przy tworzeniu kodu.
- ESLint to narzędzie, które sprawdza, czy nasz kod jest napisany zgodnie z ustalonymi przez nas regułami. Warto sprawdzić nim kod JS/TS, zanim wypchniemy go na repozytorium.
- Prettier za to umożliwia automatyczne formatowanie kodu do z góry ustalonego schematu. Często, w domowych projektach, Prettier jest całkowicie wystarczający, tylko trzeba pamiętać o jego uruchamianiu.
- Stylelint to odpowiednik ESLint dla styli. Wspiera wiele różnych języków styli (CSS, SCSS, Less), ale też można go stosować np. dla styled-components.
- Hadolint — to już nie jest stricte JSowe, ale jeśli stosujesz Dockera, to powinieneś poznać to narzędzie. Pozwala na wychwycenie bardzo wielu popularnych błędów przy pisaniu plików Dockerfile.

## 5) Brak konwencji (lub konsekwencji) architektonicznej

Ten punkt szczególnie tyczy się Reacta oraz backendów pisanych w Expressie, ale jak ktoś jest szczególnie zdolny, to może popsuć to nawet w Angularze i Nest.js.

Tworząc jakikolwiek projekt programistyczny, powinieneś się skupić, jak dzielić kod na mniejsze części, a także, jak sensownie te mniejsze części rozmieszczać w projekcie. Warto poczytać o tym, jak najlepiej dzielić kod w frameworku, który używasz i trzymać się konwencji. Poniżej kilka skrajnych przykładów błędów:

- Trzymanie wszystkiego w jednym pliku. Od tego mamy proces builda, aby nam złączyło wszystko w jednego JSa.
- [React] Trzymanie wielu komponentów w jednym pliku. Jest to raczej wiadome dla Angularowców czy Vueowców, jednak w React często spotyka się pliki kontenery na wiele komponentów. Jeśli komponenty są bardzo małe albo jest to kilka wewnętrznych, składanych następnie w jeden publicznie dostępny, to jest to jeszcze ok. Natomiast, jeśli trzymamy kilka dużych komponentów w jednym pliku js/tsx, to zdecydowanie jest to anti-pattern.
- Trzymanie wszystkiego w globalnym stanie aplikacji. Nie bez powodu możemy definiować stan rerenderujący komponent w każdym z frameworków. Takie rzeczy jak aktualna wartość inputa albo widoczność jakiegoś elementu nie muszą być istotne z punktu widzenia całej aplikacji. Globalny stan powinniśmy wykorzystywać tylko do rzeczy, które są współdzielone przez wiele różnych, niezależnych komponentów, np. mogą to być dane z API, na których aplikacja pracuje.
- Brak konsekwencji w architekturze. Jeśli wydzielasz folder na komponenty, to trzymaj w nim komponenty. Jeśli masz folder na store stanu, nie trzymaj go w innych miejscach. Jeśli korzystasz ze styled-components, to nie pisz części styli w czystym CSS bez powodu.

Przykładów kontynuować nie będę, bo mógłby z tego wyjść oddzielny artykuł. Przede wszystkim, warto poczytać, jak inni podchodzą do kwestii architektury w projekcie (React, Express), albo jaką architekturę narzuca framework (Angular, Nest.js). Jeśli natomiast nie znajdujesz nic satysfakcjonującego, to poszukaj u źródeł — np. dowiedz się o Clean Architecture, albo poczytaj Roberta Martina, który pisze o kwestii architektury kodu bardzo ogólnie, a nie z nastawieniem na konkretną technologię.

Liczę, że powyższa lista pomoże Wam przy tworzeniu jeszcze lepszych projektów i uniknięcia pewnych bardzo prostych błędów. Lista pewnie mogłaby być dłuższa, ale to te zwykle przykuwają moją największą uwagę i zapewne innych również.

Powodzenia!
