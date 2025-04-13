# 🔠 Jocul: Word Scramble (Rearanjare de litere)

Jucătorul trebuie să rearanjeze literele unui cuvânt amestecat pentru a forma cuvântul corect, având un număr limitat de încercări.

## Funcționalități principale:
1. Initializare joc
- Se alege un cuvânt random din *words.js*
- Literele sunt amestecate și afișate ca butoane
2. Selectare litere
- Jucătorul apasă pe literele amestecate pentru a forma cuvântul
- Literele selectate sunt afișate în ordinea aleasă cu substituție de "_" pentru litere nealese
3. Verificare rezultat
- La completarea tuturor literelor se compară cuvântul format cu cel corect
- Dacă corect: Afișează "YOU WIN" și imaginea curentă
- Dacă greșit: Trece la următoarea imagine din *images.js*. Jocul se termină când se ajunge la ultima imagine (se afișează "YOU LOSE")
4. Restart joc
- Resetează toate stările
- Alege un nou cuvânt din words.js
- Reamestecă literele

## [Exemplu de joc](https://react-sarcina-at2.vercel.app/)