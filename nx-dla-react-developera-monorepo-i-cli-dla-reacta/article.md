# Nx dla React developera — monorepo i CLI dla Reacta

(oryginalnie opublikowane na https://ohmydev.pl/post/nx-dla-react-developera-monorepo-i-cli-dla-reacta-7de)

W dzisiejszym krótkim wpisie chciałem Wam pokazać, jak z punktu React developera można fajnie wykorzystać Nx. Tym samym będziemy mieli coś, co wielu użytkowników innych rozwiązań wytyka Reactowi, że brakuje im tego — generatory kodu z poziomu CLI.

## Co to Nx?

Nx (https://nx.dev/) to rozwiązanie do tworzenia monorepo opracowane przez Nrwl. Udostępnia nam wstępnie ustawione konfiguracje dla różnych technologii oraz, co najistotniejsze, bardzo rozbudowane narzędzie do obsługi wszystkiego przez CLI.

Sam Nx najbardziej jest rozpoznawalny w świecie Angularowym (ja też zresztą poznałem go dzięki Angularowi), jednak nie tylko do niego jest stworzony. Domyślne wspiera:

- Angular
- React
- NestJS
- Express
- React Native
- Next.js

Oprócz tego, w swoim toolsecie ma też wsparcie dla Cypressa, Storybooka, Jesta, Detox. Wszystko jest dostarczone ze skonfigurowanym odgórnie ESLint i Prettierem.

Poza tymi wbudowanymi znajdziemy też pluginy od community do Nx, dające wsparcie między innymi dla Vue, Nuxt, Solid.js, Docusaurus... Listę znajdziecie tutaj: https://nx.dev/community.

## Tworzenie nowego projektu

Projekt w Nx składa się z aplikacji (czyli to, co możemy uruchomić) oraz bibliotek (wydzielony kod z aplikacji, np. współdzielony między nimi). Aby założyć nowy projekt, piszemy w terminalu:

```bash
npx create-nx-workspace@latest
```

Po wpisaniu nazwy projektu zostaniemy spytani o to, wg jakiego szablonu chcemy utworzyć projekt. Nas, jako Reactowców, interesować mogą:

- react — tworzy pojedynczą aplikację Reactową
- next.js — tak jak wyżej, ale z użyciem Next.js zamiast Reacta
- react-native — pojedyncza aplikacja React Native
- react-express — tworzy full-stackowe rozwiązanie z dwoma appkami, frontend w React i backend w Expressie
- apps — czyste monorepo bez utworzonych jakichkolwiek aplikacji.

Następnie konfigurujemy nazwę aplikacji, a także jaki system styli ma wykorzystywać.

Nie będę tutaj przechodzić przez cały proces tworzenia appki. Jeżeli chcesz poznać to od podstaw (do czego zachęcam), to możesz sprawdzić oficjalny tutorial: https://nx.dev/react-tutorial/01-create-application.

Natomiast, jeśli interesuje Cię przemigrowanie appki z Create React App do Nx, możesz skorzystać z tego poradnika: https://nx.dev/migration/migration-cra

## CLI dla React developera

Z racji, że nie chcę pisać kompletnego tutoriala korzystania z Nx, wymienię tutaj tylko najbardziej przydatne polecenia z punktu widzenia React developera.

Jeszcze mała uwaga, zanim przejdę do poleceń: dopisując do każdego z nich na końcu `--dry-run`, polecenie tylko poda jakie pliki utworzy bądź zmodyfikuje, ale nie wykona żadnych operacji.

Jeżeli natomiast jakieś z poleceń Ci nie działa, doinstaluj paczkę z poleceniem. Na przykład, jeśli w poleceniu mamy `nx generate @nrwl/react:application`, to aby działało poprawnie, musimy zainstalować paczkę `@nrwl/react`. Także, zakładam tutaj, że masz zainstalowanego Nx globalnie. Jeżeli nie, możesz go uruchamiać też z poziomu `npm run nx`.

### Utworzenie nowej aplikacji Reactowej

```bash
nx generate @nrwl/react:application --name=nazwa_appki --routing
```

Jeżeli chcesz mieć aplikację bez skonfigurowanego react-routera, usuń parametr `--routing`.

Analogiczne polecenia mamy dla innych, powiązanych technologii:

```bash
nx generate @nrwl/next:application --name=nazwa_appki
nx generate @nrwl/react-native:application --name=nazwa_appki
```

Drobna uwaga na boku: zamiast `generate` można pisać skrótowo g.

Warto też dodać, że oprócz aplikacji, zostanie także wygenerowany automatycznie projekt testów E2E w Cypressie.

### Utworzenie nowej biblioteki Reactowej

Pracując w monorepo, warto często wydzielać pewne elementy aplikacji do przestrzeni bibliotek, zamiast trzymać wszystko wewnątrz aplikacji. W tym celu służą nam biblioteki. Możemy traktować je w projekcie następnie tak, jakby była to zewnętrzna paczka NPMowa. Tylko tyle, że wszystko mamy u siebie, bez publikowania w jakimkolwiek rejestrze.

```bash
nx generate @nrwl/react:library --name=nazwa_libki --no-routing
```

Możemy usunąć parametr `--no-routing`, jeśli chcemy mieć wewnątrz libki skonfigurowanego react-routera.

Pamiętajmy, żeby współdzielony kod między projektami był w libkach, ponieważ Nx nie pozwala na importy pomiędzy aplikacjami.

### Utworzenie nowego komponentu Reactowego

Za pomocą nx generate możemy także utworzyć nowy komponent Reactowy w dowolnej bibliotece lub appce w naszym projekcie.

```bash
nx generate @nrwl/react:component --name=nazwa_komponentu --project=nazwa_appki_lub_libki
```

Wygenerowany zostanie plik z komponentem oraz plik z unit testami do niego (Jest + React Testing Library).

### Utworzenie nowego slice w Reduksie

Aplikacja w React to często także i stan trzymany w Reduksie. Nx umożliwia nam szybkie tworzenie nowych slice'ów w Reduksie z poziomu CLI, dzięki czemu nie musimy nic robić ręcznie. Nawet jeśli projekt jeszcze nie ma Reduksa, to Nx dogra zależność, a także skonfiguruje od zera store.

```bash
nx generate @nrwl/react:redux --name=nazwa_slice --project=nazwa_appki_lub_libki
```

Wygenerowany slice będzie od razu zawierać przykładowy reducer i thunki pod zaciąganie danych z API. Osobiście jednak preferuję do API wykorzystywać RTK Query, czego Nx jeszcze nie obsługuje, ale może wkrótce...

### Utworzenie konfiguracji Storybooka

Jak każdy developer wie, najlepszą dokumentacją komponentów Reactowych, szczególnie tych współdzielonych między wieloma miejscami, jest Storybook. Dodanie Storybooka do projektu w Nx to również jedno polecenie:

```bash
nx generate @nrwl/react:storybook-configuration --name=nazwa_projektu_lub_libki
```

Co warto dodać, jeżeli nasze komponenty mają default exporty, to Nx automatycznie sam wygeneruje do nich storiesy. Także, jeżeli projekt nie ma zdefiniowanych testów E2E (np. jest to libka), to Nx zaproponuje także wygenerowanie testów E2E działających na Storybooku, za pomocą których możemy opisać testami poszczególne storiesy.

(oczywiście te autowygenerowane stories to tylko szablony, które musimy uzupełnić sami o argumenty, ale zawsze oszczędza to nieco pracy)

Jak już skonfigurowaliśmy Storybooka, ale chcielibyśmy, żeby Nx wygenerował nam historyjki i E2E do nowych komponentów, to możemy posiłkować się poleceniem:

```bash
nx generate @nrwl/react:stories --project=nazwa_projektu_lub_libki --generateCypressSpecs
```

Jeśli nie masz testów E2E do Storybooka, usuń ostatni parametr.

### Zobrazowanie zależności w projekcie

Jak już zorganizowaliśmy nasz projekt jako prawdziwe monorepo, warto czasem podejrzeć na to, jaką architekturę sobie wyklikaliśmy. Służy do tego polecenie:

```bash
nx graph
```

Otworzy nam ono diagram, gdzie zobaczymy, jakie są powiązania między aplikacjami i libkami w projekcie. Z mojej perspektywy, jak wchodzę do projektu Nxowego prowadzonego już jakiś czas, jest to pierwsza rzecz, jaką odpalam. Nie jest to coś stricte Reactowego, ale warto wiedzieć o istnieniu tego narzędzia.

## Coś więcej?

To, co wymieniłem tutaj, to polecenia, które ja mam okazję najczęściej używać. Jest jeszcze kilka więcej i znajdziesz je pod poniższymi linkami:

- https://nx.dev/react/overview
- https://nx.dev/next/overview
- https://nx.dev/react-native/overview

Także, codzienną pracę z Nx bardzo ułatwiają dedykowane wtyczki do IDE. Doskonale zdaję sobie sprawę, że nie wszystko chcemy robić z poziomu CLI, a też oszczędzimy dzięki nim czasu na wertowaniu dokumentacji Nx:

- oficjalny plugin do VS Code: https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console
- nieoficjalny plugin do Webstorm (ale polecam go, bardzo dobry): https://plugins.jetbrains.com/plugin/15101-nx-console-idea
