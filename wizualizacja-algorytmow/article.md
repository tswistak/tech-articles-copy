# Wizualizacja algorytmów

(oryginalnie opublikowane na https://ohmydev.pl/post/wizualizacja-algorytmow-1jf5)

Jakiś czas temu jak omawiałem [wizualizowanie danych](../wizualizacja-danych-co-warto-znac/article.md), to pisałem, że dzięki temu, jesteśmy w stanie pokazać pewne zależności niewidoczne na pierwszy rzut oka. Tym razem chciałbym poszerzyć temat o dość konkretną wizualizację — wizualizację algorytmów.

## Po co wizualizacje algorytmów?

Teraz możesz zadać pytanie — a po co wizualizować algorytmy? Mają one takie zalety:

- Pozwalają pokazać działanie od środka, dzięki czemu łatwiej jest analizować ich działanie.
- Ułatwiają naukę.
- Jako interaktywny element, są wartością dodaną do artykułów, zwiększają ich atrakcyjność.

Sam takie wizualizacje tworzę do wielu artykułów na swoim [blogu](https://swistak.codes/). Z opinii, które dostałem, wiem, że czytelnicy chwalą je sobie, bo pozwalają zobrazować tematy, o których piszę.

## Sposoby wizualizacji algorytmów

Przejrzyjmy teraz, jak algorytmy możemy wizualizować. Możemy:

- Wizualizować proces/przebieg za pomocą np. schematów blokowych czy diagramów sekwencji. W tym celu możemy stosować biblioteki do rysowania diagramów, [o których pisałem ostatnio](../wizualizacja-danych-co-warto-znac/article.md).
- Wizualizować rezultaty, zarówno końcowy jak i stan w trakcie wykonywania.

Chciałbym się tutaj skupić na tych drugich. Rezultaty i stan różnych zmiennych w trakcie wykonywania możemy reprezentować np. za pomocą:

- Wykresów — te np. fajnie potrafią pokazać algorytmy sortowania, bo wzrokowo szybko widzimy różnice w wielkości elementów.
- Drzew i grafów — za ich pomocą można reprezentować... algorytmy drzewiaste czy grafowe. Zarówno przechodzenie po drzewach/grafach (DFS, BFS itd.), operacje na nich (dodawanie elementów do drzew, usuwanie, równoważenie), czy tradycyjne algorytmy Dijkstry, Bellmana-Forda itd. Również mogą służyć jako dodatkowy podgląd w algorytmach, które drzewa wykorzystują jako strukturę pomocniczą, np. Heap Sort.

Jednak wyobraźnia nas nie powinna tutaj ograniczać. Algorytmy graficzne najlepiej się reprezentuje po prostu rysując po canvasie, czy czymkolwiek co może zasymulować mapę bitową. Rozwiązywanie wież Hanoi? Narysujmy, jak przesuwają się krążki po słupkach w trakcie wykonania. A może do wizualizacji sortowania zrobić trójwymiarową scenę, gdzie tancerze będą pokazywać po kolei algorytm, niczym [w znanych filmikach](https://www.youtube.com/watch?v=ywWBy6J5gz8)? Sky is the limit.

## Jak zdobyć dane do wizualizacji?

Wyciągnięcie rezultatu jest oczywiste, wystarczy algorytm wykonać. Schody zaczynają się, gdy chcemy wizualizować stany pośrednie. Jak to zrobić?

Ja proponuję wykorzystać do tego [generatory](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). Główne zastosowanie generatorów to generowanie wartości bez ich uprzedniego zapamiętania w pamięci, ale czemu tego nie wykorzystać do zwracania stanów pośrednich algorytmów? W końcu mechanizm ten umożliwia nam "zapauzowanie" wykonania wraz ze zwróceniem wartości.

Zobaczmy to jednak na przykładzie jednego z najprostszych algorytmów, czyli sortowania bąbelkowego. Zacznijmy od tradycyjnej wersji, która zwróci nam posortowaną tablicę:

```javascript
function sort(array) {
  for (let length = array.length - 1; length > 0; length--) {
    for (let i = 0; i < length; i++) {
      const current = array[i];
      const compared = array[i + 1];
      if (current > compared) {
        array[i] = compared;
        array[i + 1] = current;
      }
    }
  }
  return array;
}
```

Jak natomiast moglibyśmy zwracać stan pośredni każdej z iteracji z wykorzystaniem generatorów? Na przykład tak:

```javascript
function* sort(array) {
  for (let length = array.length - 1; length > 0; length--) {
    for (let i = 0; i < length; i++) {
      const current = array[i];
      const compared = array[i + 1];
      if (current > compared) {
        array[i] = compared;
        array[i + 1] = current;
      }
      yield array;
    }
  }
  return array;
}
```

Zwróć uwagę na charakterystyczne cechy dla generatorów — gwiazdka przy deklaracji funkcji (stąd interpreter wie, że będzie ona generatorem) oraz yield, który zwraca wartość wraz ze wstrzymaniem dalszego wykonania. Generator ma tę cechę, że funkcja przy wywołaniu zwraca obiekt, który jest jednocześnie iterable (zawiera `[Symbol.iterator]`) oraz iteratorem (zawiera funkcję `next()`). Skoro jest iterable, to możemy teraz w taki sposób wywołać naszą funkcję sortującą, by poznać wszystkie stany pośrednie:

```javascript
const array = [20, 10, 3, 7];
for (const state of sort(array)){
  console.log(state);
}
```

Po wykonaniu tego kodu w dowolnym środowisku JS-owym (np. pod F12 w przeglądarce) powinieneś otrzymać 6 zwrotek w konsoli, każda z nich pokazująca kolejny stan algorytmu. Zrobiliśmy to, w zasadzie nie zaburzając w żaden sposób przebiegu algorytmu ani też nie modyfikując go znacznie. Możemy też przekazywać więcej danych, np. możemy przekazać indeksy elementów, które zostały zamienione, czy też zwracać wartość przed zamianą i po zamianie. Jedyne co nas tutaj ogranicza to wyobraźnia. Od razu powiem, że rekurencja w algorytmach (np. w quick sort) nie jest problemem. Po prostu robimy wywołania rekurencyjne na zasadzie `yield* funkcja(argumenty)`.

## Dlaczego generatory?

Teraz szybko podsumuję, dlaczego moim zdaniem generatory najlepiej sprawdzają się w tym zadaniu:

- Umożliwiają zwrócenie stanu pośredniego algorytmu bez nadmiernej ingerencji w jego oryginalny kształt.
- Nie mieszamy kodu prezentacji (aktualizowanie komponentów, sleepy do animacji itd.) z kodem algorytmu.
- Generatory pauzują wykonanie, więc możemy pozwolić sobie na dużą interaktywność w prezentacjach. Możemy przewinąć od razu na koniec, możemy odtwarzać animację oraz przechodzić krok po kroku.

## Przykładowe implementacje

Żeby pokazać, jak to można fajnie wykorzystać w praktyce, pozwolę sobie na małą samo promocję i przedstawię, jak na swoim blogu robiłem takie prezentacje, wraz z opisem podejścia i kodami źródłowymi.

Najwięcej miałem okazję zrobić wizualizacji [algorytmów sortowania](https://swistak.codes/category/algorytmy/sortowanie/). W tym celu wynik z generatora podpiąłem do biblioteki [Chart.js](https://www.chartjs.org/) i na najprostszym bar chart'cie pokazywałem, jak zmienia się kolejność elementów. W niektórych przypadkach stosowałem dodatkowo wizualizacje drzew z użyciem [vis.js](https://visjs.org/). Wszystkie wizualizacje mają wspólny kod źródłowy, który znajdziesz tutaj: https://github.com/tswistak/sorting-algorithms/tree/main/sorting-visualizer/src. Całość jest spięta frameworkiem [Svelte](https://svelte.dev/), przy czym od razu zaznaczam, że pisząc ten kod uczyłem się Svelte, więc sam zdaję sobie sprawę, że kod nie jest idealny.

Przykłady sortowań:

- [Sortowanie bąbelkowe](https://swistak.codes/sortowanie-cz-2-sortowanie-babelkowe/) — tutaj zastosowałem jedynie wykres. Swoją drogą, możesz porównać [kod źródłowy algorytmu przystosowanego do tej prezentacji](https://github.com/tswistak/sorting-algorithms/blob/main/sorting-visualizer/src/algorithms/bubbleSortOptimized1.js) z powyżej pokazanym.
- [Sortowanie przez kopcowanie](https://swistak.codes/sortowanie-cz-4-sortowanie-przez-wybieranie/) (trzeba zjechać nieco w dół artykułu) — tutaj oprócz wykresu jest też drzewo reprezentujące kopiec, służący do znajdowania minimalnej wartości w kolekcji.
- [Sortowanie pozycyjne](https://swistak.codes/sortowanie-cz-6-teraz-bez-porownywania/) (również nieco bardziej na dole) — tutaj dodatkowo pokazuję zawartość tablicy pomocniczej, czyli dodatkowej struktury danych potrzebnej przy wykonywaniu sortowania. Jest to przykład tego, że możemy zwracać dowolne dane z algorytmu i prezentować je w dowolny sposób.

Jednak, żeby pokazać, że nie tylko sortowaniem żyje człowiek, to pośród wizualizacji dość niedawno pokazywałem, jak układa się wieże Hanoi. Tak samo, wykorzystałem tutaj generatory, jednak tym razem sam rysowałem wynik algorytmu za pomocą zabaw z divami i CSSem. Prezentację znajdziesz [w tym artykule](https://swistak.codes/wieze-hanoi/), a [kod źródłowy tutaj](https://github.com/tswistak/towers-of-hanoi/tree/main/visualizer/src).

Jeszcze inne wizualizacje, jakie robiłem to:

- Wizualizacja algorytmów rysowania linii — tutaj zrobiłem tablicę symulującą siatkę pikseli, na której stawiałem punkty. W tym przypadku nie użyłem akurat generatorów, ale sama wizualizacja spełnia swoją rolę. Linki: [artykuł z prezentacjami](https://swistak.codes/jak-komputer-rysuje-linie/), [kod źródłowy](https://github.com/tswistak/line-drawing).
- Wizualizacja algorytmów rysowania okręgów — zrobiona analogicznie jak powyższa, tylko tym razem zastosowałem generatory. Linki: [artykuł](https://swistak.codes/jak-komputer-rysuje-okregi/), [kod źródłowy](https://github.com/tswistak/circle-drawing).

Mam nadzieję, że dzięki temu krótkiemu wpisowi poznaliście nowy sposób na zrobienie czegoś ciekawego na frontendzie. A nawet jeśli nigdy nie będziecie mieli okazji pisać wizualizacji tego typu, to chociaż liczę, że poszerzyłem waszą wiedzę na temat tego, jak można wykorzystywać w praktyce generatory.
