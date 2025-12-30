#include <iostream>
#include <fstream>
using namespace std;

struct CauhoiTN {
    string noidung;
    string dapanA;
    string dapanB;
    char dapanDung;
};

void nhap(CauhoiTN &cau) {
    cin.ignore();
    cout << "Nhap noi dung cau hoi: ";
    getline(cin, cau.noidung);
    cout << "Nhap dap an A: ";
    getline(cin, cau.dapanA);
    cout << "Nhap dap an B: ";
    getline(cin, cau.dapanB);
    cout << "Nhap dap an dung (A/B): ";
    cin >> cau.dapanDung;
    cau.dapanDung = toupper(cau.dapanDung);
}

void xuat(const CauhoiTN &cau) {
    cout << "Cau hoi: " << cau.noidung << endl;
    cout << "A. " << cau.dapanA << "\nB. " << cau.dapanB << endl;
    cout << "Dap an dung: " << cau.dapanDung << endl;
}

void docfile(ifstream &f, CauhoiTN &cau) {
    getline(f, cau.noidung);
    getline(f, cau.dapanA);
    getline(f, cau.dapanB);
    f >> cau.dapanDung;
    f.ignore();
}

void ghifile(ofstream &f, const CauhoiTN &cau) {
    f << cau.noidung << "\n" << cau.dapanA << "\n" << cau.dapanB << "\n" << cau.dapanDung << "\n";
}

bool kiemtra(const CauhoiTN &cau) {
    cout << "Cau hoi: " << cau.noidung << endl;
    cout << "A. " << cau.dapanA << "\nB. " << cau.dapanB << endl;
    char dapan;
    cout << "Nhap dap an cua ban (A/B): ";
    cin >> dapan;
    return toupper(dapan) == cau.dapanDung;
}

void trim(string &str) {
    for (int i = 0; i < str.size(); i++) {
        if (str[i] == ' ' && (i == 0 || str[i - 1] == ' ')) {
            str.erase(i, 1);
            i--;
        }
    }
}

void trimCauhoi(CauhoiTN &cau) {
    trim(cau.noidung);
    trim(cau.dapanA);
    trim(cau.dapanB);
}

void menu() {
    CauhoiTN ds[100];
    int choice, n = 0;

    do {
        cout << "\n1. Tao de thi va luu vao file";
        cout << "\n2. Doc file va hien thi de thi";
        cout << "\n3. Thi trac nghiem";
        cout << "\n4. Xoa khoang trang thua trong file";
        cout << "\n5. Thoat";
        cout << "\nChon: ";
        cin >> choice;
        switch (choice) {
        case 1: {
            ofstream fout("de_thi.TTN");
            cout << "Nhap so cau hoi: ";
            cin >> n;
            for (int i = 0; i < n; i++) {
                nhap(ds[i]);
                ghifile(fout, ds[i]);
            }
            fout.close();
            break;
        }
        case 2: {
            ifstream fin("de_thi.TTN");
            if (!fin) {
                cout << "Khong tim thay file!" << endl;
                break;
            }
            n = 0;
            while (!fin.eof() && n < 100) {
                docfile(fin, ds[n]);
                xuat(ds[n]);
                n++;
            }
            fin.close();
            break;
        }
        case 3: {
            ifstream fin("de_thi.TTN");
            if (!fin) {
                cout << "Khong tim thay file!" << endl;
                break;
            }
            int diem = 0, tong = 0;
            while (!fin.eof() && tong < 100) {
                docfile(fin, ds[tong]);
                if (kiemtra(ds[tong])) diem++;
                tong++;
            }
            fin.close();
            cout << "Ket qua: " << diem << "/" << tong << " cau dung." << endl;
            break;
        }
        case 4: {
            ifstream fin("de_thi.TTN");
            if (!fin) {
                cout << "Khong tim thay file!" << endl;
                break;
            }
            n = 0;
            while (!fin.eof() && n < 100) {
                docfile(fin, ds[n]);
                trimCauhoi(ds[n]);
                n++;
            }
            fin.close();
            ofstream fout("de_thi.TTN", ios::trunc);
            for (int i = 0; i < n; i++) {
                ghifile(fout, ds[i]);
            }
            fout.close();
            cout << "Da xoa khoang trang thua!" << endl;
            break;
        }
        }
    } while (choice != 5);
}

int main() {
    menu();
    return 0;
}
