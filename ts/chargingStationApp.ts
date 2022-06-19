/*
 * Copyright (c) 2021 GraphDefined GmbH <achim.friedland@graphdefined.com>
 * This file is part of Chargy Desktop App <https://github.com/OpenChargingCloud/ChargingStation>
 *
 * Licensed under the Affero GPL license, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.gnu.org/licenses/agpl.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

///<reference path="OCPPv1_6.ts" />
class chargingStationApp
{

    //#region Data

    private proxyOCPPv1_6: OCPPv1_6 | undefined;
    private LogView: HTMLDivElement;
    private readonly tenantId: HTMLInputElement;
    private readonly tokenId: HTMLInputElement;
    private readonly connectionInput: HTMLInputElement;
    private readonly connectionButton: HTMLButtonElement;

    //#endregion

    constructor()
    {
        this.tenantId         = document.querySelector('#tenantId') as HTMLInputElement;
        this.tokenId          = document.querySelector('#tokenId') as HTMLInputElement;
        this.connectionInput  = document.querySelector('#chargePointId') as HTMLInputElement;
        this.connectionButton = document.querySelector('#connection') as HTMLButtonElement;
        this.LogView          = document.querySelector('#logView') as HTMLDivElement;

        this.connectionButton.onclick = () => this.connection();

    }

    private connection(): void
    {
        let protocol        = 'ocpp1.6';
        let chargingPointId = this.connectionInput.value;
        let tenantId        = this.tenantId.value;
        let tokenId         = this.tokenId.value;

        let wsUri                      = 'ws://164.90.164.22:8010/OCPP16/' + tenantId + '/' + tokenId + '/' + chargingPointId;
        this.proxyOCPPv1_6             = new OCPPv1_6((t) => this.writeToScreen(t), wsUri, protocol);
        this.connectionButton.disabled = true;
        this.connectionInput.disabled  = true;
    }

    private writeToScreen(message: string)
    {
        this.LogView.insertAdjacentHTML('afterbegin',
            '<p>' + message + '</p>');
    }

}
