---
title: "Упражнения на диаграммы Эйлера (1-4 классы)"
slug: "euler-diagram-exercises"
summary: "Последовательность упражнений для знакомства с множествами, отношениями между ними и диаграммами Эйлера — Венна."
layout: "layouts/material.njk"
permalink: "/materials/euler-diagram-exercises/index.html"
section: "Логика"
tags:
  - "диаграммы Эйлера"
  - "множества"
  - "логика"
grades:
  - "1–4"
links: []
---
![Иллюстрация 1 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»](/assets/materials/euler-diagram-exercises/uelexr1.jpg)

Диаграммы Эйлера-Венна одна из традиционных тем на математических кружках. Ребята уже с 3 класса (а иногда и раньше) могут успешно применять подобных схемы для решения арифметических задач. С возрастом область применения таких диаграмм расширяется, и взаимодействие с ними становится обязательным навыком для олимпиадников. Более широко, эта тема — это начало бесконечно долгого разговора о множествах, который может завести увлечённых математикой в такие дебри ... ~~десятки парадоксов, аксиома выбора, бесконечные множества, ординалы и кардиналы, разнообразные логики и многое другое.~~

Но, к сожалению, часто опыт использования диаграмм Эйлера-Венна ограничивается заучиванием двух-трёх приёмов для решения арифметических задач и не содержит понимания самого ценного — идеи множества и отношений между ними. На проработку этого аспекта и направлены предлагаемые материалы.

На элементарном и конкретном уровне множества можно обсуждать уже с 1 класса. Разные форматы заданий и постепенное усложнение, посредством добавление новых деталей, располагают к самостоятельной работе.

Это **первая часть** постов про круги Эйлера, в я расскажу про подготовительные упражнения. В конец файла будет ссылка на сборник всех перечисленных упражнений. Во **второй части** я подробнее остановлюсь на текстовых задачах. **Третья часть** же будет посвящена применению диаграмм для обсуждения делимости, наивной теории множеств и математической логики.

Упражнения даны в условном порядке возрастания сложности. Упражнения требуют вдумчивого подхода и полны ловушек. Как помочь ученикам ~~почти~~ самостоятельно преодолеть эти трудности можно прочитать в этом посте.

## Введение
Но перед тем, как приступить к задачам, стоит обсудить слово "множество" и его значение. Нет смысла формулировать точное определение, достаточно с одной стороны подобрать синонимы (например, "набор") и найти однокоренное слово "много".

Несмотря на близость к слову "много", множество не обязательно содержит много элементов. Чтобы вывести учеников на это можно показать несколько предметов в руках и попросить перечислить "множество предметов, которое я держу в рука".

После этого можно оставить в руках 1 предмет (например, терпеливую кошку). Так получаем множество состоящее из одного предмета. После показываем пустые руки, и получаем множество без элементов. Такое множество называется "пустым".

Далее стоит обсудить следующие картинки. После знакомства с каждым вариантом взаимного расположения множеств

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr2.png" alt="Иллюстрация 2 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr3.png" alt="Иллюстрация 3 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr4.png" alt="Иллюстрация 4 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

Небольшое вступление настраивает учеников на рабочую атмосферу, после чего они приступают к задачам.

## Расставить числа в 1 и 2 круга (1-3)
Первое упражнение, которое сразу может вызвать затруднение, но внимательный школьник сам сможет это затруднение и разрешить. А именно увидеть, что на схеме даны два множества.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr5.png" alt="Иллюстрация 5 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr6.png" alt="Иллюстрация 6 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

Усложняем упражнения и даём схемы с двумя (не считая большого множества) кругами. Таких взаимных положений может быть 3: множества отдельны друг от друга, пересекаются и одно лежит внутри другого. Тут важно натолкнуть учеников на идею, что каждое число встречается ровно 1 раз.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr7.png" alt="Иллюстрация 7 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr8.png" alt="Иллюстрация 8 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr9.png" alt="Иллюстрация 9 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr10.png" alt="Иллюстрация 10 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr11.png" alt="Иллюстрация 11 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr12.png" alt="Иллюстрация 12 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

## Раскрасить области по условию (1+)
После того, как ученики осваивают идею о возможном взаимном расположении двух множеств можно переходить дальше. Но вместо аналогичных задач про 3 множества, для начала я предлагаю следующие упражнения.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr13.png" alt="Иллюстрация 13 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr14.png" alt="Иллюстрация 14 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr15.png" alt="Иллюстрация 15 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr16.png" alt="Иллюстрация 16 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr17.png" alt="Иллюстрация 17 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr18.png" alt="Иллюстрация 18 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr19.png" alt="Иллюстрация 19 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr20.png" alt="Иллюстрация 20 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr21.png" alt="Иллюстрация 21 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr22.png" alt="Иллюстрация 22 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

## Расставить числа в 3 круга (2+)
Переходим к задачам посложнее. Возможно, что для некоторых второклассников эти задачи будут объективно трудными, так как затрагивают работу с причинно-следственными связями, но эта же причина делает обсуждение этих задач с третьеклассниками чем-то большим, чем просто выполнение упражнений.

Для особо прытких учеников можно дать дополнительное задание поставить в пустые области по одному своему числу или попробовать объяснить, почему это невозможно сделать.

![Иллюстрация 23 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»](/assets/materials/euler-diagram-exercises/uelexr23.png)
<figure>
  <img src="/assets/materials/euler-diagram-exercises/uelexr24.png" alt="Можно ли найти какое-нибудь число, которое будет находиться вне этих трёх множеств?" loading="lazy">
  <figcaption>Можно ли найти какое-нибудь число, которое будет находиться вне этих трёх множеств?</figcaption>
</figure>
<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr25.png" alt="Иллюстрация 25 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr26.png" alt="Иллюстрация 26 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr27.png" alt="Иллюстрация 27 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr28.png" alt="Иллюстрация 28 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

## Задания, связанные с чтением диаграмм (1-2)
Следующим мини-этапом станут упражнения на анализ диаграмм. Обычно я задаю эти задачи **второклассникам** на дом, так как они носят развлекательный характер и помогают посмотреть на изученный механизм с новой стороны.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr29.png" alt="Иллюстрация 29 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr30.png" alt="Иллюстрация 30 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr31.png" alt="Иллюстрация 31 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr32.png" alt="Иллюстрация 32 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

## Задача на сопряжённые схемы (2+)
Важно, чтобы ученик мог рисовать разные схемы. Для этого подходит следующая задача, в которой для одной и той же ситуации нарисованы две разные схемы.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr33.png" alt="Иллюстрация 33 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr34.png" alt="Иллюстрация 34 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr35.png" alt="Иллюстрация 35 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr36.png" alt="Иллюстрация 36 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr37.png" alt="Иллюстрация 37 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

## Придумать числа для каждой из областей (3+)
Следующий уровень сложности — самому придумывать числа для заданных областей. Чтобы сделать это задание более конкретным, числа должны быть самыми маленькими или самыми большими в зависимости от задания.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr38.png" alt="Иллюстрация 38 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr39.png" alt="Иллюстрация 39 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr40.png" alt="Иллюстрация 40 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr41.png" alt="Иллюстрация 41 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr42.png" alt="Иллюстрация 42 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>
<figure>
  <img src="/assets/materials/euler-diagram-exercises/uelexr43.png" alt="Оранжевым цветом -- необязательные чмсла." loading="lazy">
  <figcaption>Оранжевым цветом -- необязательные чмсла.</figcaption>
</figure>

## Придумать названия множеств (3+)
Теперь ученикам предстоит самостоятельно придумать названия множествам по заданным элементам. Многие из этих задач могут вызвать трудности и у четвероклассников, тем не менее это хорошие упражнения, дарящее решившему их радость и чувство выполненного долга.

<div class="image-carousel" role="region" aria-label="Карусель иллюстраций к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" tabindex="0">
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr44.png" alt="Иллюстрация 44 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr45.png" alt="Иллюстрация 45 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr46.png" alt="Иллюстрация 46 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr47.png" alt="Иллюстрация 47 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr48.png" alt="Иллюстрация 48 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
  <figure class="image-carousel__slide">
    <img src="/assets/materials/euler-diagram-exercises/uelexr49.png" alt="Иллюстрация 49 к материалу «Упражнения на диаграммы Эйлера (1-4 классы)»" loading="lazy">
  </figure>
</div>

## Задачи на расставление точек (1+)
Помочь самостоятельно отыскать алгоритмы решения арифметических задач поможет следующая серия задач. Основная идея заключается в том, что сначала дети решают задачи перебором, но устав от него или столкнувшись с большими числами, смогут придумать аналитический способ решения.

Первоклассникам будет достаточно самых первых задач, чтобы поработать не только с конкретными объектами (числа, цвета, персонажи), но и с количеством. Решение сложных задач ждёт ребят в будущем!

<figure>
  <img src="/assets/materials/euler-diagram-exercises/uelexr50.png" alt="Для решения последней задаче придётся поломать голову, но оно того стоит!" loading="lazy">
  <figcaption>Для решения последней задаче придётся поломать голову, но оно того стоит!</figcaption>
</figure>

## Материалы
Все перечисленные выше упражнения можно найти в файле по ссылке ниже.

[1-4 классы Упражнения на диаграммы Эйлера](https://docs.google.com/document/d/1ltLgcfy-lWTpkBYOy4CYIJf1SPwN7WT3sXERbTLaDFY/edit?tab=t.0#heading=h.4a9976cnyfdn)

Задачи можно копировать из гугл.документа или создать копию этого файла у себя на диске. Для навигации по файлу используйте оглавление слева.

<figure>
  <img src="/assets/materials/euler-diagram-exercises/uelexr51.png" alt="Инструкция по копированию гул.документа" loading="lazy">
  <figcaption>Инструкция по копированию гул.документа</figcaption>
</figure>
<figure>
  <img src="/assets/materials/euler-diagram-exercises/uelexr52.png" alt="Оглавление файла можно найти слева" loading="lazy">
  <figcaption>Оглавление файла можно найти слева</figcaption>
</figure>
