import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackbarService } from '../../core/services/snackbar.service';
import { mobileInformation } from '../../core/mocks/mobile-information.mock';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/auth/auth.service';
import { Brand } from '../../shared/models/brand.model';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-mobile-upload',
  templateUrl: './mobile-upload.component.html',
  styleUrls: ['./mobile-upload.component.scss']
})
export class MobileUploadComponent implements OnInit, OnDestroy {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public subscription: Subscription = new Subscription();
  public mobileInformation = mobileInformation;
  public brands: Brand[];
  public model: string[] = [];
  public urls: string[] = [];
  public cities = mobileInformation.userCities;
  public dispUrls: string[] = [];
  public ram = mobileInformation.ram;
  public rom = mobileInformation.rom;

  public formData: FormGroup;
  public title = 'fireBaseUpload';
  public angularFireStorageReference: AngularFireStorageReference;
  public angularFireUploadTask: AngularFireUploadTask;
  public uploadProgress: Observable<number>;
  public selectedBrand;
  public url = '';
  public uploadedImages: { fileName }[];
  public uploadPercentages: Observable<number>;
  public files: Observable<{}[]>;

  constructor(
    private formBuilder: FormBuilder,
    private mobileService: MobileService,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private router: Router,
    private snackBarService: SnackbarService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.authService.isLoggedIn();

    this.availableBrands();
    this.firstFormGroupInitialisation();
    this.secondFormGroupInitialisation();
    this.brands = this.mobileService.brandlistner();
    this.files = this.angularFirestore.collection('files').valueChanges();
    this.mobileFormInitialisation();

    this.userService.userDetails(localStorage.getItem('token')).subscribe(async (response) => {
      if (response.hasOwnProperty('data')) {
        const user = await response[`data`];
        this.formData.value.userName = user[0].userName;
      }
    });
  }

  private mobileFormInitialisation(): void {
    this.formData = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000)
      ]),
      ram: new FormControl('', Validators.required),
      rom: new FormControl('', Validators.required),
      primaryCamera: new FormControl('', [Validators.required,
      Validators.min(0),
      Validators.max(30)
      ]),
      secondaryCamera: new FormControl('', [Validators.required,
      Validators.min(0),
      Validators.max(20)
      ]),
      battery: new FormControl('', [Validators.required,
      Validators.min(1000),
      Validators.max(6000)
      ]),
      images: new FormControl(''),
      userName: new FormControl('')
    });
  }

  private availableBrands(): void {
    this.subscription = this.mobileService.brands().subscribe(result => {
      if (result.hasOwnProperty('data')) {
        this.brands = [...result[`data`]];
      }
    });
  }

  private secondFormGroupInitialisation(): void {
    // ? Validators for second form group i.e specification
    this.secondFormGroup = this.formBuilder.group({
      ram: ['', Validators.required],
      rom: ['', Validators.required],
      primaryCamera: [
        '',
        [Validators.required,
        Validators.min(0),
        Validators.max(30)
        ]
      ],
      secondaryCamera: [
        '',
        [Validators.required,
        Validators.min(0),
        Validators.max(20)
        ]
      ],
      battery: [
        '',
        [Validators.required,
        Validators.min(1000),
        Validators.max(6000)
        ]
      ]
    });
  }

  private firstFormGroupInitialisation(): void {
    // ? Validators for first form group i.e details
    this.firstFormGroup = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000)
      ]]
    });
  }

  public brand(): void {
    this.model = this.selectedBrand.model;
  }

  // ? Restricting user to only enter numbers.
  public validate(event): boolean {
    return (event.charCode === 8 || event.charCode === 0)
      ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  // ? Saving the data of first form group.
  public saveFirstForm(): void {
    this.formData.value.brand = this.firstFormGroup.value.brand.brand;
    this.formData.value.model = this.firstFormGroup.value.model;
    this.formData.value.location = this.firstFormGroup.value.location;
    this.formData.value.price = this.firstFormGroup.value.price;
  }

  // ? Saving the data for second form group.
  public saveSecondForm(): void {
    this.formData.value.ram = this.secondFormGroup.value.ram;
    this.formData.value.rom = this.secondFormGroup.value.rom;
    this.formData.value.primaryCamera = this.secondFormGroup.value.primaryCamera;
    this.formData.value.secondaryCamera = this.secondFormGroup.value.secondaryCamera;
    this.formData.value.battery = this.secondFormGroup.value.battery;
  }

  public isCorrect(): boolean {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.urls.length !== 0
    ) {
      return false;
    }
    return true;
  }

  public saveThirdForm(): void {
    // ? Merging all the images to the form data.

    if (this.urls.length <= 6) {
      this.formData.value.image = this.urls;
      this.mobileService
        .saveFormData(this.formData.value)
        .subscribe((data) => {
          if (data) {
            this.snackBarService.openSnackBar(
              'Mobile is posted successfully', 'green-snackbar'
            );
          }
        });
      this.mobileService.updateMobileList.next(true);
      this.router.navigate(['/']);
    } else {
      this.snackBarService.openSnackBar(
        'Please insert 6 or less than 6 images', 'red-snackbar'
      );
      this.urls = [];
      this.uploadedImages = [];
      this.clear();
      this.dispUrls = [];
    }
  }

  // ? Allowing to update only .jpg and .png
  public importImages(event): void {
    // ? reset the array
    this.urls = [];
    this.uploadedImages = [];

    let extension = event.target.value.substring(
      event.target.value.length - 3,
      event.target.value.length
    );
    if (
      extension !== 'jpg' &&
      extension !== 'png' &&
      extension !== 'JPG' &&
      extension !== 'PNG'
    ) {
      extension = event.target.value.substring(
        event.target.value.length - 4,
        event.target.value.length
      );

      if (extension !== 'jpeg' && extension !== 'JPEG') {
        return;
      }
    }

    const filelist = event.target.files;
    const uploadPercentages: Observable<number>[] = [];
    for (const file of filelist) {
      const path = `files/${file.name}`;
      const ref = this.angularFireStorage.ref(path);
      const task = this.angularFireStorage.upload(path, file);
      const percentages = task.percentageChanges();
      uploadPercentages.push(percentages);

      // !create composed object with different information.
      const uploadTrack = {
        fileName: file.name,
        percentage: percentages
      };

      // !pushes every upload into the array
      this.uploadedImages.push(uploadTrack);

      task.then((element) => {
        return element.ref.getDownloadURL().then(url => {
          this.urls.push(url);
          return this.angularFirestore.collection('files').add({
            name: element.metadata.name,
            url
          });
        });
      });
    }
    this.uploadPercentages = combineLatest(uploadPercentages).pipe(
      map((progressPercentages) => {
        let result = 0;
        progressPercentages.map((percentage) => {
          result = result + percentage;
        });
        return result / progressPercentages.length;
      }),
    );
    this.dispUrls = this.urls;
  }
  public clear(): void {
    this.urls = [];
    this.dispUrls = [];
    this.uploadPercentages = null;
  }
  public saveForm(): void {
    this.saveFirstForm();
    this.saveSecondForm();
    this.saveThirdForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
