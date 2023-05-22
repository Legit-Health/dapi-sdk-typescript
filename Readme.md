# JavaScript/TypeScript SDK for Legit.Health Dermatology API

Official SDK for integrating the Dermatology API offered by Legit.Health 🩺🤖

## Instructions

If you want to start sending requests to Legit.Health's Dermatology API, you have to create an instance of the class `@legit.health/dapi-sdk/MediaAnalyzer`. It requires two arguments:

- The URL of the API. The preproduction enviroment uses the following value: `https://ia-pre.legit.health:8443/v2/legit_health/predict`. 
- The API Key we have provided to you. Without it, you won't be able to send requests to the API.

The class `MediaAnalyzer` exposes two methods:

- `predict`, to send a predict request to the API, in case you need to analyze an image to obtain the probability of the detected pathologies.

- `followUp`, to send a follow up request to get the evolution information about a diagnosed image.

## Predict requests

The `predict` method of our `MediaAnalyzer` class receives one argument of the class `MediaAnalyzerArguments` containing a `PredictData` object. The constructor of this class receives several arguments, so you can specify the image itself and information about the patient or the body site:

```js

import MediaAnalyzer from '@legit.health/dapi-sdk/MediaAnalyzer';
import PredictData from '@legit.health/dapi-sdk/PredictData';
import MediaAnalyzerArguments from '@legit.health/dapi-sdk/MediaAnalyzerArguments';
import BodySiteCode from '@legit.health/dapi-sdk/BodySiteCode';
import Operator from '@legit.health/dapi-sdk/Operator';
import Subject from '@legit.health/dapi-sdk/Subject';
import Gender from '@legit.health/dapi-sdk/Gender';
import Company from '@legit.health/dapi-sdk/Company';

const predictData = new PredictData(
    image,
    BodySiteCode.ArmLeft,
    Operator.Patient,
    new Subject(
        'subject identifier',
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        'practitioner identifier'
        new Company('company identifier', 'Company Name')
    )
);
const mediaAnalyzerArguments = new MediaAnalyzerArguments(
    generateRandomString(15),
    predictData
);
```

Once you've created a `PredictData` object, you can send the request in this way:

```js
const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);
const response = await mediaAnalyzer.predict(mediaAnalyzerArguments);
```

The response object contains several properties with the information returned by the API about the analyzed image:

- `preliminaryFindings` is an object of the class `@legit.health/dapi-sdk/PreliminaryFindingsValue` with the probability of the different suspicions that the algorithm has about the image. 

- `modality` is the modality of the image detected. 

- `mediaValidity` is an object that contains information about whether the image sent contains relevant dermatological information

- `metricsValue` contains the sensitivity and specificity values. 

- `conclusions` is an array of `@legit.health/dapi-sdk/Conclusion` objects with the detected pathologies and its probability. The total probability is distributed among each of the pathologies detected.

- `iaSeconds` is the time spent by the algorithms analyzying the image.

## Follow up requests

The `followUp` method of the `MediaAnalyzer` class receives one object of the class `MediaAnalyzerArguments` containing a `FollowUpData` object. The constructor of this class receives several arguments, so you can specify the image itself and information about a well known condition.

### Example. Follow up request for psoriasis

Let's see how to send a follow-up request for a patient diagnosed with psoriasis.

Firstly, we will create the different objects that represents the questionnaires used to track the evolution of psoriasis:

```ts
import ApasiLocalQuestionnaire from '@legit.health/dapi-sdk/ApasiLocalQuestionnaire';
import PasiLocalQuestionnaire from '@legit.health/dapi-sdk/PasiLocalQuestionnaire';
import Pure4Questionnaire from '@legit.health/dapi-sdk/Pure4Questionnaire';
import DlqiQuestionnaire from '@legit.health/dapi-sdk/DlqiQuestionnaire';
import Questionnaires from '@legit.health/dapi-sdk/Questionnaires';

// ...

const apasiLocal = new ApasiLocalQuestionnaire(3);
const pasiLocal = new PasiLocalQuestionnaire(3, 2, 1, 1);
const pure4 = new Pure4Questionnaire(0, 0, 0, 1);
const dlqi = new DlqiQuestionnaire(1, 1, 2, 0, 0, 0, 1, 2, 2, 0);
const questionnaires = new Questionnaires([apasiLocal, pasiLocal, pure4, dlqi]);
```

Then, we will create an object of the class `@legit.health/dapi-sdk/FollowUpArguments`:

```ts
// ...
import FollowUpData from '@legit.health/dapi-sdk/FollowUpData';
import MediaAnalyzerArguments from '@legit.health/dapi-sdk/MediaAnalyzerArguments';

// ...
const previousMedias = [new PreviousMedia(previousImage, previousImageDate)];
const scoringSystems = questionnaires.questionnaires.map((questionnaire) => questionnaire.getName());
// const scoringSystems = ['APASI_LOCAL', 'PASI_LOCAL', 'PURE4', 'DLQI'];
const followUpData = new FollowUpData(
    generateRandomString(15),
    image,
    'Psoriasis',
    BodySiteCode.ArmLeft,
    previousMedias,
    Operator.Patient,
    new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
    ),
    questionnaires.questionnaires.map((questionnaire) => questionnaire.getName()),
    questionnaires
);
const mediaAnalyzerArguments = new MediaAnalyzerArguments(
    generateRandomString(15),
    followUpData
);
```

Unlike diagnostic support requests, follow-up requests supports the following additional arguments:

- `previousMedias` is an array of objects of the class `@legit.health/dapi-sdk/MediaAnalyzerArguments/PreviousMedia/PreviousMedia` with a list of previous images taken of the current pathology.

- `scoringSystems` is an array of strings with the name of the scoring systems to be evaluated. It supports the following values:

```
[ ASCORAD_LOCAL, APASI_LOCAL, AUAS_LOCAL, AIHS4_LOCAL, DLQI, SCOVID, ALEGI, PURE4, UCT, AUAS7, APULSI, SCORAD_LOCAL, PASI_LOCAL, UAS_LOCAL, IHS4_LOCAL]
```

- `questionnaires` is an object of the class `@legit.health/dapi-sdkQuestionnaires` with the values of the scoring systems to be evaluated.

Once you've created a `MediaAnalyzerArguments` object, you can send the request in this way:

```ts
const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);
const response = await mediaAnalyzer.followUp(mediaAnalyzerArguments);
```

The response object contains several properties with the information returned by the API about the analyzed image:

- `preliminaryFindings` is an object of the class `@legit.health/dapi-sdk/PreliminaryFindingsValue` with the probability of the different suspicions that the algorithm has about the image.

- `modality` is the modality of the image detected.

- `mediaValidity` is an object that contains information about whether the image sent contains relevant dermatological information

- `metricsValue` contains the sensitivity and specificity values.

- `iaSeconds` is the time spent by the algorithms analyzying the image.

Besides, it contains two extra properties:

- `explainabilityMedia`, with the image containing the surface of the injury detected by our AI algorithms.

- `scoringSystemsValues`, an object of the class `@legit.health/dapi-sdk/ScoringSystemValues` with the values calculated for each scoring system included in the array `scoringSystems` of the arguments.

#### The `ScoringSystemValues` object

The `ScoringSystemValues` property of `MediaAnalyzerResponse` contains all the information about a scoring system, for example, APASI_LOCAL.

You can access to the value of one scoring system using the method `getScoringSystemValues`:

```ts
const apasiLocalScoringSystemValue = response.getScoringSystemValues('APASI_LOCAL');
```

Once you have one object of the class `ScoringSystemValues`, you can perform the following actions:

- Access to the value of each facet using the method `getFacetCalculatedValue(facetCode: string): ScoringSystemFacetCalculatedValue`.

- Access to the score of the scoring system through its property `score`. It is an object with three properties:

    - `category`, which represents the severity of the score.
    - `calculatedScore`, for those scoring systems whose calculation depends on facets that are computed by our AI algorithm: APASI_LOCAL, APULSI, ASCORAD_LOCAL and AUAS_LOCAL.
    - `questionnaire`, for those scoring systems whose calculations not depends on facet computed by our AI algorithm, for example, DLQI.

Full example:

```ts
const apasiLocalScoringSystemValue = response.getScoringSystemValues('APASI_LOCAL');

const apasiScore = apasiLocalScoringSystemValue->getScore()->calculatedScore;
const apasiSeverityCategory = $apasiLocalScoringSystemValue->getScore()->category;

const apasiLocalScoringSystemValue = response.getScoringSystemValues('APASI_LOCAL');
const desquamation = response.getFacetCalculatedValue('desquamation');
const desquamationValue = desquamation.value; // A value between 0 and 4 as the PASI states
const desquamationIntensity = desquamation.intensity; // A value between 0 and 100 reflecting the intensity of the desquamation
```
