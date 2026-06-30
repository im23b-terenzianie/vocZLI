# Smartphone-Sensoren – Übersicht (Modul 335)

## Accelerometer

Misst Beschleunigung entlang der x-, y- und z-Achse in g (1g ≈ 9.81 m/s²). Einsatz z. B. für Schrittzähler, Tilt-Steuerung in Games oder Erkennung von Geräteorientierung (Hochformat/Querformat). In Expo liefert er ein `{x, y, z}`-Objekt über `Accelerometer.addListener()`.
**Einschränkungen:** Rauschen bei schnellen Bewegungen, dauerhaftes Abfragen kostet Akku, auf Android ab API 31 limitiert auf 200 Hz (höhere Rate braucht extra Permission `HIGH_SAMPLING_RATE_SENSORS`).

## Gyroscope

Misst Rotationsgeschwindigkeit um die drei Achsen in rad/s. Typisch für Spiele-Steuerung, Stabilisierung von AR-Inhalten oder Erkennung von Drehbewegungen. Liefert ebenfalls `{x, y, z}`.
**Einschränkungen:** Drift über Zeit (Werte verschieben sich ohne tatsächliche Bewegung), nicht auf jedem günstigen Gerät vorhanden, Akkuverbrauch bei hoher Abtastrate.

## Magnetometer / Kompass

Misst Magnetfeldstärke zur Bestimmung der Himmelsrichtung, z. B. für Kompass-Apps oder Navigation. Gibt Magnetfeldwerte je Achse zurück.
**Einschränkungen:** Stark störanfällig durch metallische Objekte oder elektronische Geräte in der Nähe, braucht regelmässige Kalibrierung, auf manchen Geräten ungenau oder gar nicht verbaut.

## GPS / Location

Liefert geografische Koordinaten (Latitude/Longitude), Höhe und Genauigkeit – verwendet für Karten, Routing oder standortbasierte Dienste (z. B. "Restaurants in der Nähe").
**Einschränkungen:** Benötigt explizite Berechtigung des Nutzers (iOS/Android Permission-Dialog), hoher Akkuverbrauch bei Dauerbetrieb, Genauigkeit schwankt stark (Indoor schlecht, im Freien meist gut), Verzögerung beim ersten Fix.

## Proximity (Näherungssensor)

Erkennt, ob sich ein Objekt (meist das Ohr) nahe am Display befindet – wird genutzt, um den Bildschirm während eines Anrufs automatisch auszuschalten.
**Einschränkungen:** Sehr eingeschränkte API-Verfügbarkeit in React Native/Expo (kein direkter Sensor-Support im Standard-SDK), stark geräteabhängig, oft nur binäres Signal (nah/fern) ohne genaue Distanz.

## Ambient Light (Umgebungslicht)

Misst die Helligkeit der Umgebung in Lux, genutzt z. B. für automatische Bildschirmhelligkeit oder Dark-Mode-Vorschläge. In Expo über `LightSensor` verfügbar.
**Einschränkungen:** Laut Expo-Doku nur auf Android unterstützt, auf iOS nicht verfügbar – Plattformabhängigkeit muss im Code abgefangen werden.

## Barometer

Misst Luftdruck (hPa), wird z. B. für Höhenmessung (Stockwerkserkennung) oder Wetter-Apps verwendet.
**Einschränkungen:** Nicht in jedem Gerät verbaut (eher in Flaggschiff-Smartphones), Werte können durch Wind/Wetter verfälscht werden, geringe praktische Relevanz für die meisten Standard-Apps.

## Kamera

Wird für Foto-/Video-Aufnahme, QR-Code-Scanning oder Dokumenten-Scan eingesetzt. Liefert Bild-/Videodaten als Stream oder Datei.
**Einschränkungen:** Erfordert explizite Kamera-Permission, hoher Akku- und Speicherverbrauch, Verhalten und Auflösung stark geräteabhängig, bei Web teils eingeschränkt nutzbar.

## Mikrofon

Nimmt Audiodaten auf, z. B. für Sprachsteuerung, Spracherkennung oder Audio-Memos.
**Einschränkungen:** Benötigt Mikrofon-Permission, störanfällig durch Hintergrundgeräusche, kontinuierliche Aufnahme verbraucht viel Akku und kann Datenschutzbedenken auslösen.