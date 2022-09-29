# JavaScript / TypeScript SDK for integrate with the Dermatology API offered by Legit.Health

Official SDK for integrate with the Dermatology API offered by Legit.Health 🩺🤖

## Instructions

If you want to start sending requests to Legit.Health's Dermatology API, you have to create an instance of the class `@legit.health/dapi-sdk/MediaAnalyzer`. It requires two arguments:

- The URL of the API. The preproduction enviroment uses the following value: `https://ia-pre.legit.health:8443/v2/legit_health/predict`. 
- The API Key we have provided to you. Without it, you won't be able to send requests to the API.

The class `MediaAnalyzer` exposes two methods:

- `predict`, to send a predict request to the API, in case you need to analyze an image to obtain the probability of the detected pathologies.

- `followUp`, to send a follow up request to get the evolution information about a diagnosed image.

## Predict requests

The `predict` method of our `MediaAnalyzer` class receives one argument of the class `PredictArguments`. The constructor of this class receives several arguments, so you can specify the image itself and information about the patient or the body site:

```js

import MediaAnalyzer from '@legit.health/dapi-sdk/MediaAnalyzer';
import PredictArguments from '@legit.health/dapi-sdk/MediaAnalyzerArguments/PredictArguments';
import BodySiteCode from '@legit.health/dapi-sdk/MediaAnalyzerArguments/BodySite/BodySiteCode';
import Operator from '@legit.health/dapi-sdk/MediaAnalyzerArguments/Operator/Operator';
import Subject from '@legit.health/dapi-sdk/MediaAnalyzerArguments/Subject/Subject';
import Gender from '@legit.health/dapi-sdk/MediaAnalyzerArguments/Subject/Gender';
import Company from '@legit.health/dapi-sdk/MediaAnalyzerArguments/Subject/Company';

const predictArguments = new PredictArguments(
    'requestId',
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
```

Once you've created a `PredictArguments` object, you can send the request in this way:

```js
const response = await mediaAnalyzer.predict(predictArguments);
```

The response object contains several properties with the information returned by the API about the analyzed image:

- `preliminaryFindings` is an object of the class `@legit.health/dapi-sdk/MediaAnalyzerResponse/PreliminaryFindingsValue` with the probability of the different suspicions that the algorithm has about the image. 

- `modality` is the modality of the image detected. 

- `mediaValidity` is an object that contains information about whether the image sent contains relevant dermatological information

- `metricsValue` contains the sensitivity and specificity values. 

- `conclusions` is an array of `@legit.health/dapi-sdk/MediaAnalyzerResponse/Conclusion/Conclusion` objects with the detected pathologies and its probability. The total probability is distributed among each of the pathologies detected.

- `iaSeconds` is the time spent by the algorithms analyzying the image.


